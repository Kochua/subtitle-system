export default () => {
  let domain = window.location.hostname

  const WWWW = domain.slice(0, 4)
  if (WWWW === "www.") {
    return domain.substring(4)
  }

  return domain
}
