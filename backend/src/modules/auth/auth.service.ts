import bcrypt from "bcryptjs";
import { signToken } from "../../common/middleware/auth";
import { prisma } from "../../common/utils/prisma";
import { AppError } from "../../common/utils/response";

export async function register(email: string, password: string) {
  if (await prisma.user.findUnique({ where: { email } }))
    throw new AppError(409, "Email already registered");
  const u = await prisma.user.create({
    data: { email, passwordHash: await bcrypt.hash(password, 12) },
  });
  return { token: signToken({ id: u.id, role: u.role }), role: u.role };
}
export async function login(email: string, password: string) {
  const u = await prisma.user.findUnique({ where: { email } });
  if (!u || !(await bcrypt.compare(password, u.passwordHash)))
    throw new AppError(401, "Invalid email or password");
  return { token: signToken({ id: u.id, role: u.role }), role: u.role };
}
