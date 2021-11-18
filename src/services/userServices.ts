import { prisma } from "$utils/prisma.utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
interface RegisterUserObject {
  username: string;
  email: string;
  name: string;
  password: string;
}

interface RegisterGuruObject {
  email: string;
  name: string;
  password: string;
  NIP: string;
  schoolId: number;
}

function createToken(user: any) {
  const token = jwt.sign(
    { id: user.id, email: user.email, schoolId: user.schoolId },
    process.env.JWT_SECRET_TOKEN?.toString() || "",
    {
      expiresIn: "24h",
    }
  );
  return token;
}

interface UserResponseObject {
  token: string;
  name: string;
  role: string;
  email: string;
  schoolId: number;
}
interface GuruResponseObject extends UserResponseObject {
  nip: string;
}

export async function userLoginService(
  email: string,
  password: string
): Promise<any> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: { profile: true },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user);
      const userDetails: UserResponseObject = {
        token: token,
        name: user.name,
        role: user.role,
        email: user.email,
        schoolId: user.schoolId,
      };

      if (user.role == "ADMIN") {
        return { status: true, userDetails };
      } else {
        const teacherDetails: GuruResponseObject = {
          ...userDetails,
          nip: user.profile?.NIP || "",
        };
        return { status: true, userDetails: teacherDetails };
      }
    } else {
      throw new Error("Incorrect");
    }
  } catch (err: any) {
    return { status: false, error: "Unauthorized" };
  }
}

export async function userRegisterSekolahService(
  user: RegisterUserObject
): Promise<any> {
  try {
    const selectedUserField = {
      id: true,
      email: true,
      name: true,
      schoolId: true,
    };

    const selectedSchoolField = { id: true, name: true };
    const createdSchool = await prisma.school.create({
      data: {
        uuid: uuidv4(),
        name: user.name,
      },
      select: selectedSchoolField,
    });
    user.password = await bcrypt.hash(user.password, 12);

    const createdUser = await prisma.user.create({
      data: {
        ...user,
        uuid: uuidv4(),
        role: "ADMIN",
        schoolId: createdSchool.id,
      },
      select: selectedUserField,
    });
    const token = createToken(createdUser);

    return { status: true, user: createdUser, school: createdSchool, token };
  } catch (err: any) {
    return { status: false, error: { message: "Register Failed" } };
  }
}

export async function userRegisterGuruService(
  user: RegisterGuruObject,
  schoolId: number
): Promise<any> {
  try {
    const selectedTeacherField = {
      id: true,
      name: true,
      NIP: true,
    };
    const createdTeacher = await prisma.profileTeacher.create({
      data: {
        uuid: uuidv4(),
        name: user.name,
        NIP: user.NIP,
      },
      select: selectedTeacherField,
    });

    const selectedUserField = {
      id: true,
      email: true,
      name: true,
      schoolId: true,
    };

    user.password = await bcrypt.hash(user.password, 12);

    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        uuid: uuidv4(),
        role: "GURU",
        schoolId: schoolId,
        profileId: Number(createdTeacher.id),
      },
      select: selectedUserField,
    });

    const token = createToken(createdUser);

    return { status: true, user: createdUser, teacher: createdTeacher, token };
  } catch (err: any) {
    return { status: false, error: { message: "Register Failed" } };
  }
}
