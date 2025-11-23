export default function getTimeZones(timezones) {
  const utcWithOffsetArray = [];

  for (const timezone of timezones) {
    for (const utc of timezone.utc) {
      utcWithOffsetArray.push({ utc, offset: timezone.offset });
    }
  }

  return utcWithOffsetArray;
}
