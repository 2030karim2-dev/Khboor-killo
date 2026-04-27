import { SignJWT, jwtVerify } from 'jose';
import CryptoJS from 'crypto-js';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'khuboor-2026-super-secret-development-key'
);

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'khuboor-encrypt-key-2026-dev';

// إنشاء Token JWT للمستخدم
export async function createToken(payload: { 
  userId: string; 
  role: 'buyer' | 'admin' | 'seller'; 
  email: string 
}) {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

// التحقق من صحة Token JWT
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

// تشفير البيانات الحساسة (مثل كلمات المرور المؤقتة)
export function encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
}

// فك تشفير البيانات
export function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// التحقق من صلاحية الجلسة
export async function validateSession(token: string | undefined) {
  if (!token) return null;
  return await verifyToken(token);
}