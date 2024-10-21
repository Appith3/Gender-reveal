import { AVERAGE_CLICKS_PER_SECOND, MAX_LIFE, MAX_TIME_IN_SECONDS } from "../constants";

export const calculateBalloonLife = (players) => {
  const totalClicks = players * AVERAGE_CLICKS_PER_SECOND * MAX_TIME_IN_SECONDS;

  return Math.min(totalClicks, MAX_LIFE);
};