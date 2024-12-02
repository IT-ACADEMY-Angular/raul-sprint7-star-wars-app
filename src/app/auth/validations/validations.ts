export class Validations {
  static emailAlreadyInUseMessage = 'Este email ya está registrado.';
  static emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  static namePattern = /^[A-Za-z]*$/;

  static validateFirstName(firstName: string): string | null {
    if (!firstName || firstName.length < 3 || !this.namePattern.test(firstName)) {
      return 'First name must have at least 3 characters and only letters.';
    }
    return null;
  }

  static validateSecondName(secondName: string): string | null {
    if (!secondName || secondName.length < 3 || !this.namePattern.test(secondName)) {
      return 'Second name must have at least 3 characters and only letters.';
    }
    return null;
  }

  static validateEmail(email: string): string | null {
    if (!email || !this.emailPattern.test(email)) {
      return 'Please provide a valid email address.';
    }
    return null;
  }

  static validatePassword(password: string): string | null {
    if (!password || password.length < 6) {
      return 'Password must have at least 6 characters.';
    }
    return null;
  }
}
