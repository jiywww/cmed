import crypto from "crypto";

/**
 * Generates a random salt.
 *
 * @param length - The length of the salt to be generated.
 * @returns A random salt.
 */
function generateSalt(length = 16): string {
    return crypto.randomBytes(length).toString("hex");
}

/**
 * Generates a hash and a salt for a given password.
 *
 * @param password - The password to be hashed.
 * @returns An array where the first element is the salt and the second element is the hashed password.
 */
export function hashPassword(password: string): string[] {
    // generate salt using pbkdf2Sync
    const salt = generateSalt(); // generate a random salt
    const iterations = 1000; // number of iterations
    const hash = crypto
        .pbkdf2Sync(password, salt, iterations, 64, "sha256")
        .toString("hex");
    return [salt, hash];
}

/**
 * Verifies if a given password matches the stored hash.
 *
 * @param inputPassword - The password to be verified.
 * @param storedHash - The stored hash.
 * @param salt - The salt used to hash the password.
 * @returns True if the password is verified, false otherwise.
 */
function verifyPassword(
    inputPassword: string,
    storedHash: string,
    salt: string
): boolean {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, salt, 1000, 64, "sha256")
        .toString("hex");
    return inputHash === storedHash;
}
