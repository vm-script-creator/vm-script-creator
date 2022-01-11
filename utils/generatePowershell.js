function changeHostname(newHostname) {
  return `Rename-Computer -NewName "${newHostname}" -DomainCredential $Cred\n`
}

function changeAdminPw(newPw) {
  return `net user administrator ${newPw} /active:yes\n`
}

function generateCreds(username, password) {
  return `$SecPassword = ConvertTo-SecureString '${password}' -AsPlainText -Force
$Cred = New-Object System.Management.Automation.PSCredential('${username}', $SecPassword)\n`
}

function installADDS(DomainName, DomainNetBiosName) {
  return `Install-ADDSForest -DomainName "${DomainName}" -CreateDnsDelegation:$false -DatabasePath ` +
    `"C:\\Windows\\NTDS" -SafeModeAdministratorPassword $SecPassword -DomainMode "7" ` +
    `-DomainNetbiosName "${DomainNetBiosName}" -ForestMode "7" -InstallDns:$true -LogPath ` +
    `"C:\\Windows\\NTDS" -SysvolPath "C:\\Windows\\SYSVOL" -Force:$true\n`;
}

function restartComputer() {
  return `Restart-Computer -Force -Restart\n`
}

function enableWinRM() {
  return `Set-Service WinRM -StartMode Automatic
Get-WmiObject -Class win32_service | Where-Object {$_.name -like "WinRM"}
Set-Item WSMan:localhost\\client\\trustedhosts -Value * -Force
netsh advfirewall firewall add rule name="WinRM-HTTP" dir=in localport=5985 protocol=TCP action=allow\n`
}

function enableRDP() {
  return `Set-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\' -Name "fDenyTSConnections" -Value 0
Set-ItemProperty 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\\WinStations\\RDP-Tcp\\' -Name "UserAuthentication" -Value 0
Enable-NetFirewallRule -DisplayGroup "Remote Desktop\n`
}

function createADUser(samAccountName, name, password, winRM) {
  return `$UserPassword = ConvertTo-SecureString '${password}' -AsPlainText -Force
New-ADUser -Name "${name}" -GivenName "${name}" -SamAccountName "${samAccountName}" -AccountPassword $UserPassword -ChangePasswordAtLogon $False -Enabled $True
${winRM ? "net localgroup \"Remote Management Users\" /add " + samAccountName + " /dom" : ""}`
}

function createUser(samAccountName, name, password, winRM) {
  return `net user ${samAccountName} ${password} /add

${generateCreds(samAccountName, password)}
Start-Process PowerShell -Cred $Cred -ArgumentList 'whoami'
    

${winRM ? "net localgroup \"Remote Management Users\" /add " + samAccountName + " /dom" : ""}`
}

export default function generatePowershell(props) {
  return new Promise((resolve, reject) => {
    var powershell1 = '#POWERSHELL SCRIPT GENERATED BY VM-SCRIPT-CREATOR\n';
    var powershell2 = '#POWERSHELL SCRIPT GENERATED BY VM-SCRIPT-CREATOR\n';
    var powershell3 = '#POWERSHELL SCRIPT GENERATED BY VM-SCRIPT-CREATOR\n';

    // SCRIPT 1
    // Customizing Windows via registry tweaks, debloating it, changing hostname, changing admin password
    // and other things that require a reboot.
    if (props.changeAdminPassword) powershell1 += changeAdminPw(props.adminPwd);
    powershell1 += generateCreds(props.adminUser, props.adminPwd);
    if (props.changeHostname) powershell1 += changeHostname(props.hostname);
    powershell2 += restartComputer();

    // SCRIPT 2 (SERVERS ONLY)
    // Installing ADDS forest and setting up the domain
    if (props.isServer) {
      powershell2 += generateCreds(props.adminUser, props.adminPwd);
      if (props.ADDS.install) {
        powershell2 += installADDS(props.ADDS.domainName, props.ADDS.netbiosName);
        powershell2 += restartComputer();
      }
    }

    // SCRIPT 3
    // Creating files, installing services that do not require a reboot, creating users, and other tasks
    // that do not require a reboot. 
    powershell3 += generateCreds(props.adminUser, props.adminPwd);
    if (props.enableWinRM) {
      powershell3 += enableWinRM();
    }
    if (props.enableRDP) {
      powershell3 += enableRDP();
    }
    if (props.isServer && props.ADDS.install) {
      props.users.forEach(user => {
        powershell3 += createADUser(user.samAccountName, user.name, user.password, user.winRM);
      })
    } else {
      props.users.forEach(user => {
        powershell3 += createUser(user.samAccountName, user.name, user.password, user.winRM);
      })
    }

    resolve({
      powershell1,
      powershell2,
      powershell3
    })
  })
}
