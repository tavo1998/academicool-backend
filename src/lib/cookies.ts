export function createOptionsCookie(minutes: number) {
  return {
    httpOnly: true,
    expires: new Date(Date.now() + (minutes * 60000))
  }
}