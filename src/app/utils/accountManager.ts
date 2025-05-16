let account: string | null = null;

export function setAccount(newAccount: string | null) {
  account = newAccount;
}

export function getAccount() {
  return account;
}

export function logout() {
  account = null;
}
