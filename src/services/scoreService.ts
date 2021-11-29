import { prisma } from "$utils/prisma.utils";
import { Decimal } from "@prisma/client/runtime";
import { v4 as uuidv4 } from "uuid";

export async function createScoreConfigService(
  type: string,
  category: string,
  weight: number,
  minimumScore: number,
  schoolId: number
): Promise<any> {
  try {
    const createdScoreConfig = await prisma.scoreConfig.create({
      data: {
        uuid: uuidv4(),
        type,
        category,
        weight,
        minimumScore,
        schoolId,
      },
    });

    return { status: true, score: createdScoreConfig };
  } catch (err: any) {
    console.log(err);
    return { status: false, error: "Unable to create Score Config" };
  }
}

export async function editScoreConfigService(
  scoreConfigId: string,
  type: string,
  category: string,
  weight: number,
  minimumScore: number
): Promise<any> {
  try {
    const editedScoreConfig = await prisma.scoreConfig.update({
      where: {
        uuid: scoreConfigId,
      },
      data: {
        type,
        category,
        weight,
        minimumScore,
      },
    });

    return { status: true, score: editedScoreConfig };
  } catch (err: any) {
    console.log(err);
    return { status: false, error: "Unable to edit Score Config" };
  }
}

export async function getScoreConfigService(schoolId: number) {
  try {
    const scores = await prisma.scoreConfig.findMany({
      where: { schoolId: schoolId },
    });
    return { status: true, scores };
  } catch (err: any) {
    return { status: false, error: "Unable to get score data" };
  }
}

export async function deleteScoreConfigService(
  scoreConfigId: string
): Promise<any> {
  try {
    const deletedScoreConfig = await prisma.scoreConfig.delete({
      where: {
        uuid: scoreConfigId,
      },
    });

    return { status: true, score: deletedScoreConfig };
  } catch (err: any) {
    console.log(err);
    return { status: false, error: "Unable to delete Score Config" };
  }
}

export async function createScoreService(
  name: string,
  date: Date,
  classId: number,
  courseId: number,
  scoreConfigId: number
): Promise<any> {
  try {
    const createdScore = await prisma.score.create({
      data: {
        uuid: uuidv4(),
        name,
        date,
        classId,
        courseId,
        scoreConfigId,
      },
    });

    return { status: true, score: createdScore };
  } catch (err: any) {
    console.log(err);
    return { status: false, error: "Unable to create Score" };
  }
}

export async function editScoreService(
  scoreId: string,
  name: string,
  date: Date,
  classId: number,
  courseId: number,
  scoreConfigId: number
): Promise<any> {
  try {
    const editedScore = await prisma.score.update({
      where: { uuid: scoreId },
      data: {
        name,
        date,
        classId,
        courseId,
        scoreConfigId,
      },
    });
    return { status: true, score: editedScore };
  } catch (err: any) {
    console.log(err);
    return { status: false, error: "Unable to edit cognitive Score" };
  }
}

export async function getCognitiveScoreService(schoolId: number) {
  try {
    const scores = await prisma.scoreConfig.findMany({
      where: {
        schoolId: schoolId,
        type: "Kognitif",
      },
      include: {
        Score: true,
      },
    });
    return { status: true, scores };
  } catch (err: any) {
    return { status: false, error: "Unable to get cognitive course data" };
  }
}

export async function getAffectiveScoreService(schoolId: number) {
  try {
    const scores = await prisma.scoreConfig.findMany({
      where: {
        schoolId: schoolId,
        type: "Afektif",
      },
      include: {
        Score: true,
      },
    });
    return { status: true, scores };
  } catch (err: any) {
    return { status: false, error: "Unable to get affective course data" };
  }
}

export async function getPsychomotorScoreService(schoolId: number) {
  try {
    const scores = await prisma.scoreConfig.findMany({
      where: {
        schoolId: schoolId,
        type: "Psikomotorik",
      },
      include: {
        Score: true,
      },
    });
    return { status: true, scores };
  } catch (err: any) {
    return { status: false, error: "Unable to get psychomotor course data" };
  }
}

export async function deleteScoreService(scoreId: string): Promise<any> {
  try {
    const deletedScore = await prisma.score.delete({
      where: {
        uuid: scoreId,
      },
    });

    return { status: true, score: deletedScore };
  } catch (err: any) {
    console.log(err);
    return { status: false, error: "Unable to delete Score " };
  }
}

export async function createStudentScoreService(
  score: number,
  scoreId: number,
  studentId: number
): Promise<any> {
  try {
    const findStudentScore = await prisma.studentScore.findUnique({
      where: {
        studentId_scoreId: {
          studentId,
          scoreId,
        },
      },
    });
    if (findStudentScore != null) {
      const updatedStudentScore = await prisma.studentScore.update({
        where: {
          studentId_scoreId: {
            scoreId,
            studentId,
          },
        },
        data: {
          score,
        },
      });

      return { status: true, scoreResult: updatedStudentScore };
    }
    const createdStudentScore = await prisma.studentScore.create({
      data: {
        score,
        scoreId,
        studentId,
      },
    });

    return { status: true, scoreResult: createdStudentScore };
  } catch (err: any) {
    //change error message
    return { status: false, error: String(err) };
  }
}

export async function editStudentScoreService(
  score: number,
  scoreId: number,
  studentId: number
): Promise<any> {
  try {
    const editedStudentScore = await prisma.studentScore.update({
      where: {
        studentId_scoreId: {
          studentId,
          scoreId,
        },
      },
      data: {
        score,
      },
    });

    return { status: true, scoreResult: editedStudentScore };
  } catch (err: any) {
    //change error message
    return { status: false, error: String(err) };
  }
}

export async function deleteStudentScoreService(
  scoreId: number,
  studentId: number
): Promise<any> {
  try {
    const deletedStudentScore = await prisma.studentScore.delete({
      where: {
        studentId_scoreId: {
          studentId,
          scoreId,
        },
      },
    });

    return { status: true, scoreResult: deletedStudentScore };
  } catch (err: any) {
    //change error message
    return { status: false, error: String(err) };
  }
}

export async function getScoreDetailByScoreIdService(scoreId: string) {
  try {
    const scoreDetail = await prisma.score.findUnique({
      where: { uuid: scoreId },
      include: {
        Student: true,
        Class: {
          include: {
            Student: {
              orderBy: {
                name: "asc",
              },
            },
          },
        },
      },
    });

    if (scoreDetail != null) {
      const scoreStatus = await scoreStat(scoreDetail.id);
      const scoreCount = await belowAverageCount(
        scoreStatus._avg.score,
        scoreDetail.id
      );
      const mappedScoreDetail = {
        scoreId: scoreDetail.id,
        scoreUuid: scoreDetail.uuid,
        scoreName: scoreDetail.name,
        average: scoreStatus._avg.score,
        maximum: scoreStatus._max.score,
        minimum: scoreStatus._min.score,
        belowAverageCount: scoreCount,
      };
      const mappedStudentDetail = await Promise.all(
        scoreDetail.Class.Student.map(async (studentDet) => {
          const studentScore = await getStudentScore(
            scoreDetail.id,
            studentDet.id
          );
          if (studentScore != null) {
            return {
              studentId: studentDet.id,
              studentUuid: studentDet.uuid,
              studentName: studentDet.name,
              score: studentScore.score,
            };
          }
          return {
            studentId: studentDet.id,
            studentUuid: studentDet.uuid,
            studentName: studentDet.name,
            score: null,
          };
        })
      );
      return {
        status: true,
        scoreDetail: { mappedScoreDetail, mappedStudentDetail },
      };
    }
    return { status: false, error: "Unable to get score detail" };
  } catch (err: any) {
    return { status: false, error: String(err) };
  }
}

async function scoreStat(scoreId: number) {
  return await prisma.studentScore.aggregate({
    where: {
      scoreId,
    },
    _avg: {
      score: true,
    },
    _min: {
      score: true,
    },
    _max: {
      score: true,
    },
  });
}

async function belowAverageCount(average: Decimal | null, scoreId: number) {
  if (average != null) {
    return await prisma.studentScore.count({
      where: {
        scoreId,
        score: {
          lt: average,
        },
      },
    });
  }
  return null;
}

async function getStudentScore(scoreId: number, studentId: number) {
  return await prisma.studentScore.findUnique({
    where: {
      studentId_scoreId: {
        studentId,
        scoreId,
      },
    },
    select: {
      score: true,
    },
  });
}
export async function getScoreDetailByClassIdService(
  classId: string,
  courseId: string
) {
  try {
    const scoreDetail = await prisma.score.findMany({
      where: {
        Course: {
          uuid: courseId,
        },
        Class: {
          uuid: classId,
        },
      },
      include: {
        ScoreConfig: true,
        Class: true,
        Course: true,
      },
      orderBy: [
        {
          ScoreConfig: { category: "asc" },
        },
        {
          date: "asc",
        },
      ],
    });

    const mappedScoreDetail = await Promise.all(
      scoreDetail.map(async (scoreDet) => {
        const stat = await scoreStat(scoreDet.id);
        return {
          id: scoreDet.id,
          uuid: scoreDet.uuid,
          category: scoreDet.ScoreConfig.category,
          name: scoreDet.name,
          average: stat._avg.score,
          maximum: stat._max.score,
          minimum: stat._min.score,
          classId: scoreDet.classId,
          classUuid: scoreDet.Class.uuid,
          courseId: scoreDet.courseId,
          courseUuid: scoreDet.Course.uuid,
        };
      })
    );

    return { status: true, scoreDetail: mappedScoreDetail };
  } catch (err: any) {
    return { status: false, error: String(err) };
  }
}

export async function createScoreRangeService(
  schoolId: number,
  letter: string,
  from: number,
  to: number
): Promise<any> {
  try {
    const createdScoreRange = await prisma.scoreRange.create({
      data: {
        uuid: uuidv4(),
        schoolId,
        letter,
        from,
        to,
      },
    });

    return { status: true, scoreRange: createdScoreRange };
  } catch (err: any) {
    console.log(err);
    return { status: false, error: "Unable to create Score Config" };
  }
}

export async function editScoreRangeService(
  scoreRangeId: string,
  schoolId: number,
  letter: string,
  from: number,
  to: number
): Promise<any> {
  try {
    const createdScoreRange = await prisma.scoreRange.update({
      where: {
        uuid: scoreRangeId,
      },
      data: {
        uuid: uuidv4(),
        schoolId,
        letter,
        from,
        to,
      },
    });

    return { status: true, scoreRange: createdScoreRange };
  } catch (err: any) {
    console.log(err);
    return { status: false, error: "Unable to create Score Config" };
  }
}

export async function deleteScoreRangeService(
  scoreRangeId: string
): Promise<any> {
  try {
    const deletedScoreRange = await prisma.scoreRange.delete({
      where: {
        uuid: scoreRangeId,
      },
    });

    return { status: true, scoreRange: deletedScoreRange };
  } catch (err: any) {
    //change error message
    return { status: false, error: String(err) };
  }
}

export async function getScoreRangeService(schoolId: number) {
  try {
    const scoreRange = await prisma.scoreRange.findMany({
      where: { schoolId },
    });

    return { status: true, scoreRange };
  } catch (err: any) {
    return { status: false, error: String(err) };
  }
}
