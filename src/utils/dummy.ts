import { hashPassword, generateSalt } from "./crypto";
import { db } from "../main/db";

function generatePasswordHash() {
    const password = "password";
    const salt = generateSalt();
    const hash = hashPassword(password, salt);
    return { salt, hash };
}

export function generateDummyUser() {
    const { salt, hash } = generatePasswordHash();
    db.serialize(() => {
        db.run(
            `
            INSERT INTO users (username, passwordHash, salt, role)
            VALUES (?, ?, ?, ?)
        `,
            ["dummy", hash, salt, "admin"],
            (err: Error | null) => {
                if (err) {
                    console.error("Could not create dummy user", err);
                }
            }
        );
    });
}
