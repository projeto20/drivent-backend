import { createClient } from "redis";
import eventRepository from ".";
import { Event } from "@prisma/client";

async function cacheEvent (): Promise<Event> {
    const client = createClient();
    await client.connect();

    const cacheEvent = await client.get('eventInfo');
    if (!cacheEvent) {
        const event = await eventRepository.findFirst()
        await client.set('eventInfo', JSON.stringify(event));
        return (event);
    }

    const event = JSON.parse(cacheEvent);
    
    event.startsAt = new Date(event.startsAt);
    event.endsAt = new Date(event.endsAt);
    event.createdAt = new Date(event.createdAt);
    event.updatedAt = new Date(event.updatedAt);

    return (event);
}

const redisRepository = {cacheEvent}

export default redisRepository;