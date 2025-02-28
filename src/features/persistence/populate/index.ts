import { populateBinder, populateDefaultBinder } from "./_binder";
import { populateCategory } from "./_category";
import { populatePictogram } from "./_pictogram";

export async function populate() {
	// #region Default binder
	const defaultBinderId = await populateDefaultBinder([
		{
			language: "fr-FR",
			key: "title",
			value: "Classeur général"
		},
		{
			language: "en-US",
			key: "title",
			value: "General binder"
		},
		{
			language: "fr-FR",
			key: "description",
			value: "Un classeur par défaut généraliste"
		},
		{
			language: "en-US",
			key: "description",
			value: "A general default binder"
		}
	]);

	await populateBinder([
		{
			language: "fr-FR",
			key: "title",
			value: "Classeur vide"
		},
		{
			language: "en-US",
			key: "title",
			value: "Empty binder"
		},
		{
			language: "fr-FR",
			key: "description",
			value: "Un classeur vide"
		},
		{
			language: "en-US",
			key: "description",
			value: "An empty binder"
		}
	]);
	// #endregion Default binder

	// #region Categories
	const generalCategoryId = await populateCategory([
		{
			language: "fr-FR",
			key: "name",
			value: "Général"
		},
		{
			language: "en-US",
			key: "name",
			value: "General"
		}
	], "globe");

	const greetingsCategoryId = await populateCategory([
		{
			language: "fr-FR",
			key: "name",
			value: "Salutations"
		},
		{
			language: "en-US",
			key: "name",
			value: "Greetings"
		}
	], "waving_hand");

	const politenessCategoryId = await populateCategory([
		{
			language: "fr-FR",
			key: "name",
			value: "Politesse"
		},
		{
			language: "en-US",
			key: "name",
			value: "Politeness"
		}
	], "folded_hands");

	const placesCategoryId = await populateCategory([
		{
			language: "fr-FR",
			key: "name",
			value: "Lieux"
		},
		{
			language: "en-US",
			key: "name",
			value: "Places"
		}
	], "apartment");
	// #endregion Categories

	// #region Pictograms
	await populatePictogram(defaultBinderId, generalCategoryId, [
		{
			language: "fr-FR",
			key: "word",
			value: "Oui"
		},
		{
			language: "en-US",
			key: "word",
			value: "Yes"
		}
	]);
	await populatePictogram(defaultBinderId, generalCategoryId, [
		{
			language: "fr-FR",
			key: "word",
			value: "Non"
		},
		{
			language: "en-US",
			key: "word",
			value: "No"
		}
	]);

	await populatePictogram(defaultBinderId, greetingsCategoryId, [
		{
			language: "fr-FR",
			key: "word",
			value: "Bonjour"
		},
		{
			language: "en-US",
			key: "word",
			value: "Hello"
		}
	]);
	await populatePictogram(defaultBinderId, greetingsCategoryId, [
		{
			language: "fr-FR",
			key: "word",
			value: "Au revoir"
		},
		{
			language: "en-US",
			key: "word",
			value: "Goodbye"
		}
	]);

	await populatePictogram(defaultBinderId, politenessCategoryId, [
		{
			language: "fr-FR",
			key: "word",
			value: "S'il vous plait"
		},
		{
			language: "en-US",
			key: "word",
			value: "Please"
		}
	]);
	await populatePictogram(defaultBinderId, politenessCategoryId, [
		{
			language: "fr-FR",
			key: "word",
			value: "Merci"
		},
		{
			language: "en-US",
			key: "word",
			value: "Thank you"
		}
	]);

	await populatePictogram(defaultBinderId, placesCategoryId, [
		{
			language: "fr-FR",
			key: "word",
			value: "Toilettes"
		},
		{
			language: "en-US",
			key: "word",
			value: "Lavatory"
		}
	], "https://images.unsplash.com/photo-1589824783837-6169889fa20f?w=400");
	await populatePictogram(defaultBinderId, placesCategoryId, [
		{
			language: "fr-FR",
			key: "word",
			value: "Cuisine"
		},
		{
			language: "en-US",
			key: "word",
			value: "Kitchen"
		}
	], "https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?w=400");
	await populatePictogram(defaultBinderId, placesCategoryId, [
		{
			language: "fr-FR",
			key: "word",
			value: "Chambre"
		},
		{
			language: "en-US",
			key: "word",
			value: "Bedroom"
		}
	], "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400");
	await populatePictogram(defaultBinderId, placesCategoryId, [
		{
			language: "fr-FR",
			key: "word",
			value: "Salle de bain"
		},
		{
			language: "en-US",
			key: "word",
			value: "Bathroom"
		}
	], "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400");
}