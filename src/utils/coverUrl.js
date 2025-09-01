export function coverUrl(coverId, size = "M") {
  return coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`
    : null;
}
