import { notFoundError } from "@/errors";
import { cannotListHotelsError } from "@/errors/cannot-list-hotels-error";
import activitiesRepository from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function listActivities(userId: number) {
  //Tem enrollment?
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  //Tem ticket pago isOnline false e includesHotel true
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotListHotelsError();
  }

  return enrollment;
}

async function getDatesActivities(userId: number) {
  await listActivities(userId);

  const activities = await activitiesRepository.findDates();
  return activities;
}

async function getDatesWithActivities(userId: number, dateId: number) {
  await listActivities(userId);

  const activities = await activitiesRepository.findActivitiesByDatesId(dateId);
  return activities;
}

async function postChosenActivites(userId: number, activityId: number) {
  const { id } = await listActivities(userId);

  const activities = await activitiesRepository.createChosenActivities(activityId, id);
  return activities;
}

const activitiesService = {
  getDatesActivities,
  getDatesWithActivities,
  postChosenActivites
};

export default activitiesService;
