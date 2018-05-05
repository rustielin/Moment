import CONFIG from '../../config.js'



export const getNewPhoto = () => {
	// Check if we already got photos set
	let storedPhotos = JSON.parse(localStorage.getItem('photos'));

	if (storedPhotos && storedPhotos.length > 0) {
		// We already have images
		let newPhoto = storedPhotos.pop();
		// Save the updated photos
		localStorage.setItem('photos', JSON.stringify(storedPhotos));
		// Return the new photo
		return Promise.resolve(newPhoto)
	}

	// No images found so will need to do an api call
	return fetch(`https://api.unsplash.com/photos/random?count=30&client_id=${CONFIG.unsplash.apiKey}`)
					.then((res)=>res.json())
					.then((data)=>{
						// Grab the latest photo
						let newPhoto = data.pop();


						localStorage.setItem('photos', JSON.stringify(data));
						return newPhoto;
					})
}
