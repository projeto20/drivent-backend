import { prisma } from "@/config";

async function findDates() {
  return prisma.dates.findMany();
}

async function findActivitiesByDatesId(dateId: number) {
  return prisma.dates.findFirst({
    where: {
      id: dateId
    },
    include: {
      Activities: {
        include: {
          ChosenActivities: true
        }
      }
    }
  });
}

async function createChosenActivities(activityId: number, enrollmentid: number) {
  return prisma.chosenActivities.create({
    data: {
      activitesId: activityId,
      enrollmentId: enrollmentid
    }
  });
}

const activitiesRepository = {
  findDates,
  findActivitiesByDatesId,
  createChosenActivities
};

export default activitiesRepository;
