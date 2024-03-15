import { db } from "./db";
import { hashPassword } from "../utils/crypto";
import { User } from "../types/User";

/**
 * 验证用户名和密码
 * @param {string} username 用户名
 * @param {string} password 用户输入的密码
 * @returns {Promise<boolean>} 验证成功返回true，否则返回false
 */
function verifyUser(username: string, password: string) {
    return new Promise((resolve, reject) => {
        // 查询数据库以获取用户信息，包括存储的密码哈希和盐
        db.get(
            "SELECT passwordHash, salt FROM users WHERE username = ?",
            [username],
            (err, row: User | undefined) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!row) {
                    resolve(false); // 用户名不存在
                    return;
                }

                // 假设您有一个函数hashPassword来进行密码哈希，这个函数需要您自己根据哈希逻辑实现
                const hashedInputPassword = hashPassword(password, row.salt);

                if (hashedInputPassword === row.passwordHash) {
                    resolve(true); // 密码验证成功
                } else {
                    resolve(false); // 密码验证失败
                }
            }
        );
    });
}

export { verifyUser };
