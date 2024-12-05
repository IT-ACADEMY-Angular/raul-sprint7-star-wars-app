export class Validations {

  static readonly emailAlreadyInUseMessage = 'This email is already registered.';
  static readonly emailInvalidError = 'Please enter a valid email address. Example: mail@domain.com';
  static readonly emailValidationErrorGeneric = 'An error occurred while validating the email.';
  static readonly firstNameError = 'First name must have at least 3 characters and contain only letters.';
  static readonly secondNameError = 'Second name must have at least 3 characters and contain only letters.';
  static readonly passwordError = 'Password must have at least 6 characters.';

  static readonly emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  static readonly namePattern = /^[A-Za-z]*$/;

  static validateFirstName(firstName: string): string | null {
    if (!firstName || firstName.length < 3 || !this.namePattern.test(firstName)) {
      return this.firstNameError;
    }
    return null;
  }

  static validateSecondName(secondName: string): string | null {
    if (!secondName || secondName.length < 3 || !this.namePattern.test(secondName)) {
      return this.secondNameError;
    }
    return null;
  }

  static validateEmail(email: string): string | null {
    if (!email || !this.emailPattern.test(email)) {
      return this.emailInvalidError;
    }
    return null;
  }

  static validatePassword(password: string): string | null {
    if (!password || password.length < 6) {
      return this.passwordError;
    }
    return null;
  }
}
