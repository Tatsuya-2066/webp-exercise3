export async function fetchImages(breed) {
  let response;
  if(breed == "random") {
    response = await fetch(
      `https://dog.ceo/api/breeds/image/random/12`
    );
  } else {
    response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random/12`
    );
  }
  const data = await response.json();
  return data.message;
}