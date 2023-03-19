import activitiesService from "@/services/activities-service";
import activitiesRepository from "@/repositories/activities-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";

describe("activity unit test suit ", () => {
  it("should return false if activity dates", async () => {
    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): any => { 
      return true; 
    });
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): any => { 
      return {
        status: "PAID",
        TicketType: {
          isRemote: false,
          includesHotel: true,
        }
      }; 
    });
    jest.spyOn(activitiesRepository, "findDates").mockImplementationOnce((): any => {
      return [{
        id: 1,
        date: "11",
        createdAt: "11",
        updatedAt: "11",
      }];
    });

    const order = await activitiesService.getDatesActivities(1);

    expect(order).toEqual([{
      id: expect.any(Number),
      date: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }]);
  });

  it("should return false if activity dates", async () => {
    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): any => { 
      return true; 
    });
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): any => { 
      return {
        status: "PAID",
        TicketType: {
          isRemote: false,
          includesHotel: true,
        }
      }; 
    });
    jest.spyOn(activitiesRepository, "findActivitiesByDatesId").mockImplementationOnce((): any => {
      return {
        id: 1,
        date: "1970-01-02T00:00:00.000Z",
        createdAt: "2023-03-14T16:26:51.746Z",
        updatedAt: "2023-03-14T16:27:08.054Z",
        Activities: []
      };
    });

    const order = await activitiesService.getDatesWithActivities(1, 1);

    expect(order).toEqual({
      id: expect.any(Number),
      date: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      Activities: []
    });
  });

  it("should return false if activity dates", async () => {
    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): any => { 
      return true; 
    });
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): any => { 
      return {
        status: "PAID",
        TicketType: {
          isRemote: false,
          includesHotel: true,
        }
      }; 
    });
    jest.spyOn(activitiesRepository, "createChosenActivities").mockImplementationOnce((): any => {
      return {
        id: 3,
        activitesId: 1,
        enrollmentId: 1,
        createdAt: "2023-03-14T18:00:18.375Z",
        updatedAt: "2023-03-14T18:00:18.376Z"
      };
    });

    const order = await activitiesService.postChosenActivites(1, 1);

    expect(order).toEqual({
      id: expect.any(Number),
      activitesId: expect.any(Number),
      enrollmentId: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
