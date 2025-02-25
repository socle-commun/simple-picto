import { populateDefaultBinder } from "./_binder";
import { populateCategory } from "./_category";
import { populatePictogram } from "./_pictogram";

export async function populate() {
	// #region Default binder
	const defaultBinderId = await populateDefaultBinder([
		{
			language: "fr",
			value: "Classeur par défaut"
		},
		{
			language: "en",
			value: "Default binder"
		}
	]);
	// #endregion Default binder

	// #region Categories
	const generalCategoryId = await populateCategory([
		{
			language: "fr",
			value: "Général"
		},
		{
			language: "en",
			value: "General"
		}
	], "globe");

	const greetingsCategoryId = await populateCategory([
		{
			language: "fr",
			value: "Salutations"
		},
		{
			language: "en",
			value: "Greetings"
		}
	], "waving_hand");

	const politenessCategoryId = await populateCategory([
		{
			language: "fr",
			value: "Politesse"
		},
		{
			language: "en",
			value: "Politeness"
		}
	], "folded_hands");

	const placesCategoryId = await populateCategory([
		{
			language: "fr",
			value: "Lieux"
		},
		{
			language: "en",
			value: "Places"
		}
	], "apartment");
	// #endregion Categories

	// #region Pictograms
	await populatePictogram(defaultBinderId, generalCategoryId, [
		{
			language: "fr",
			value: "Oui"
		},
		{
			language: "en",
			value: "Yes"
		}
	]);
	await populatePictogram(defaultBinderId, generalCategoryId, [
		{
			language: "fr",
			value: "Non"
		},
		{
			language: "en",
			value: "No"
		}
	]);

	await populatePictogram(defaultBinderId, greetingsCategoryId, [
		{
			language: "fr",
			value: "Bonjour"
		},
		{
			language: "en",
			value: "Hello"
		}
	]);
	await populatePictogram(defaultBinderId, greetingsCategoryId, [
		{
			language: "fr",
			value: "Au revoir"
		},
		{
			language: "en",
			value: "Goodbye"
		}
	]);

	await populatePictogram(defaultBinderId, politenessCategoryId, [
		{
			language: "fr",
			value: "S'il vous plait"
		},
		{
			language: "en",
			value: "Please"
		}
	]);
	await populatePictogram(defaultBinderId, politenessCategoryId, [
		{
			language: "fr",
			value: "Merci"
		},
		{
			language: "en",
			value: "Thank you"
		}
	]);

	await populatePictogram(defaultBinderId, placesCategoryId, [
		{
			language: "fr",
			value: "Toilettes"
		},
		{
			language: "en",
			value: "Lavatory"
		}
	], "https://images.unsplash.com/photo-1589824783837-6169889fa20f?w=400");
	await populatePictogram(defaultBinderId, placesCategoryId, [
		{
			language: "fr",
			value: "Cuisine"
		},
		{
			language: "en",
			value: "Kitchen"
		}
	], "https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?w=400");
	await populatePictogram(defaultBinderId, placesCategoryId, [
		{
			language: "fr",
			value: "Chambre"
		},
		{
			language: "en",
			value: "Bedroom"
		}
	], "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400");
	await populatePictogram(defaultBinderId, placesCategoryId, [
		{
			language: "fr",
			value: "Salle de bain"
		},
		{
			language: "en",
			value: "Bathroom"
		}
	], "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400");
	// #endregion Pictograms

	// await db.pictograms.bulkAdd([
	// 	{
	// 		word: "oui",
	// 		imageBase64: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIgoJcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiPgoJPHBhdGggZmlsbD0ib2tsY2goMC43MjMgMC4yMTkgMTQ5LjU3OSkiCgkJZD0ibTQyNC00MDgtODYtODZxLTExLTExLTI4LTExdC0yOCAxMXEtMTEgMTEtMTEgMjh0MTEgMjhsMTE0IDExNHExMiAxMiAyOCAxMnQyOC0xMmwyMjYtMjI2cTExLTExIDExLTI4dC0xMS0yOHEtMTEtMTEtMjgtMTF0LTI4IDExTDQyNC00MDhabTU2IDMyOHEtODMgMC0xNTYtMzEuNVQxOTctMTk3cS01NC01NC04NS41LTEyN1Q4MC00ODBxMC04MyAzMS41LTE1NlQxOTctNzYzcTU0LTU0IDEyNy04NS41VDQ4MC04ODBxODMgMCAxNTYgMzEuNVQ3NjMtNzYzcTU0IDU0IDg1LjUgMTI3VDg4MC00ODBxMCA4My0zMS41IDE1NlQ3NjMtMTk3cS01NCA1NC0xMjcgODUuNVQ0ODAtODBaIiAvPgo8L3N2Zz4=",
	// 		binderId: defaultBinderId,
	// 		categoryId: generalCategoryId
	// 	},
	// 	{
	// 		word: "non",
	// 		imageBase64: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIgoJcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiPgoJPHBhdGggZmlsbD0ib2tsY2goMC42MzcgMC4yMzcgMjUuMzMxKSIKCQlkPSJtNDgwLTQyNCAxMTYgMTE2cTExIDExIDI4IDExdDI4LTExcTExLTExIDExLTI4dC0xMS0yOEw1MzYtNDgwbDExNi0xMTZxMTEtMTEgMTEtMjh0LTExLTI4cS0xMS0xMS0yOC0xMXQtMjggMTFMNDgwLTUzNiAzNjQtNjUycS0xMS0xMS0yOC0xMXQtMjggMTFxLTExIDExLTExIDI4dDExIDI4bDExNiAxMTYtMTE2IDExNnEtMTEgMTEtMTEgMjh0MTEgMjhxMTEgMTEgMjggMTF0MjgtMTFsMTE2LTExNlptMCAzNDRxLTgzIDAtMTU2LTMxLjVUMTk3LTE5N3EtNTQtNTQtODUuNS0xMjdUODAtNDgwcTAtODMgMzEuNS0xNTZUMTk3LTc2M3E1NC01NCAxMjctODUuNVQ0ODAtODgwcTgzIDAgMTU2IDMxLjVUNzYzLTc2M3E1NCA1NCA4NS41IDEyN1Q4ODAtNDgwcTAgODMtMzEuNSAxNTZUNzYzLTE5N3EtNTQgNTQtMTI3IDg1LjVUNDgwLTgwWiIgLz4KPC9zdmc+",
	// 		binderId: defaultBinderId,
	// 		categoryId: generalCategoryId
	// 	},
	// 	{
	// 		word: "bonjour",
	// 		imageBase64: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSJ1bmRlZmluZWQiPjxwYXRoIGQ9Ik02ODAtMzlxLTE3IDAtMjguNS0xMlQ2NDAtODBxMC0xNyAxMS41LTI4LjVUNjgwLTEyMHE2NiAwIDExMy00N3Q0Ny0xMTNxMC0xNyAxMi0yOXQyOS0xMnExNyAwIDI4LjUgMTJ0MTEuNSAyOXEwIDEwMC03MC41IDE3MC41VDY4MC0zOVpNODAtNjQwcS0xNyAwLTI5LTExLjVUMzktNjgwcTAtMTAwIDcwLjUtMTcwLjVUMjgwLTkyMXExNyAwIDI5IDExLjV0MTIgMjguNXEwIDE3LTEyIDI5dC0yOSAxMnEtNjYgMC0xMTMgNDd0LTQ3IDExM3EwIDE3LTExLjUgMjguNVQ4MC02NDBabTEzMiA0MjlxLTkxLTkxLTkxLTIxOXQ5MS0yMTlsNTgtNTlxNS01IDEyLTV0MTIgNXEyOSAyOSAyOSA3MC41VDI5NC01NjdsLTE0IDE0cS0xMiAxMi0xMiAyOC41dDEyIDI4LjVsMzYgMzZxMjYgMjYgMjYgNjN0LTI2IDYzcS05IDktOSAyMS41dDkgMjEuNXE5IDkgMjEuNSA5dDIxLjUtOXE0NC00NCA0NC0xMDUuNVQzNTgtNTAzbC0yMi0yMnEyNi0yNiAzNy01OC41dDktNjYuNWwxNzktMTc5cTEyLTEyIDI4LjUtMTJ0MjguNSAxMnExMiAxMiAxMiAyOC41VDYxOC03NzJMNDMxLTU4NWw0MiA0MiAyNDEtMjQwcTEyLTEyIDI4LTEydDI4IDEycTEyIDEyIDEyIDI4dC0xMiAyOEw1MzAtNDg2bDQyIDQyIDIxMi0yMTJxMTItMTIgMjguNS0xMnQyOC41IDEycTEyIDEyIDEyIDI4LjVUODQxLTU5OUw2MjktMzg3bDQyIDQyIDE2Mi0xNjJxMTItMTIgMjguNS0xMnQyOC41IDEycTEyIDEyIDEyIDI4LjVUODkwLTQ1MEw2NTAtMjExcS05MSA5MS0yMTkgOTF0LTIxOS05MVoiLz48L3N2Zz4=",
	// 		binderId: defaultBinderId,
	// 		categoryId: greetingsCategoryId
	// 	},
	// 	{
	// 		word: "au revoir",
	// 		imageBase64: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiIHdpZHRoPSIyNHB4IiBmaWxsPSJ1bmRlZmluZWQiPjxwYXRoIGQ9Ik02ODAtMzlxLTE3IDAtMjguNS0xMlQ2NDAtODBxMC0xNyAxMS41LTI4LjVUNjgwLTEyMHE2NiAwIDExMy00N3Q0Ny0xMTNxMC0xNyAxMi0yOXQyOS0xMnExNyAwIDI4LjUgMTJ0MTEuNSAyOXEwIDEwMC03MC41IDE3MC41VDY4MC0zOVpNODAtNjQwcS0xNyAwLTI5LTExLjVUMzktNjgwcTAtMTAwIDcwLjUtMTcwLjVUMjgwLTkyMXExNyAwIDI5IDExLjV0MTIgMjguNXEwIDE3LTEyIDI5dC0yOSAxMnEtNjYgMC0xMTMgNDd0LTQ3IDExM3EwIDE3LTExLjUgMjguNVQ4MC02NDBabTEzMiA0MjlxLTkxLTkxLTkxLTIxOXQ5MS0yMTlsNTgtNTlxNS01IDEyLTV0MTIgNXEyOSAyOSAyOSA3MC41VDI5NC01NjdsLTE0IDE0cS0xMiAxMi0xMiAyOC41dDEyIDI4LjVsMzYgMzZxMjYgMjYgMjYgNjN0LTI2IDYzcS05IDktOSAyMS41dDkgMjEuNXE5IDkgMjEuNSA5dDIxLjUtOXE0NC00NCA0NC0xMDUuNVQzNTgtNTAzbC0yMi0yMnEyNi0yNiAzNy01OC41dDktNjYuNWwxNzktMTc5cTEyLTEyIDI4LjUtMTJ0MjguNSAxMnExMiAxMiAxMiAyOC41VDYxOC03NzJMNDMxLTU4NWw0MiA0MiAyNDEtMjQwcTEyLTEyIDI4LTEydDI4IDEycTEyIDEyIDEyIDI4dC0xMiAyOEw1MzAtNDg2bDQyIDQyIDIxMi0yMTJxMTItMTIgMjguNS0xMnQyOC41IDEycTEyIDEyIDEyIDI4LjVUODQxLTU5OUw2MjktMzg3bDQyIDQyIDE2Mi0xNjJxMTItMTIgMjguNS0xMnQyOC41IDEycTEyIDEyIDEyIDI4LjVUODkwLTQ1MEw2NTAtMjExcS05MSA5MS0yMTkgOTF0LTIxOS05MVoiLz48L3N2Zz4=",
	// 		binderId: defaultBinderId,
	// 		categoryId: greetingsCategoryId
	// 	},
	// 	{
	// 		word: "s'il vous plait",
	// 		imageBase64: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIgoJcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiPgoJPHBhdGggZmlsbD0ib2tsY2goMC41NTMgMC4wMTMgNTguMDcxKSIKCQlkPSJNNTkwLTgwcS0xMSAwLTIwLjUtNS41VDU1NS0xMDBsLTM1LTYycS01LTktNy41LTE4LjVUNTEwLTIwMXYtMjk5cTAtMjEgOC0zOXQyNy0xOHE4IDAgMTQuNSA0dDEwLjUgMTJsNjAgMTA5djgycTAgMTMgOC41IDIxLjVUNjYwLTMyMHExMyAwIDIxLjUtOC41VDY5MC0zNTB2LTc3cTAtMTAtMi41LTIwdC03LjUtMTlMNTI3LTc0NXEtMTUtMjgtMTUtNTl0MTYtNThxMTMtMTUgMzItMTZ0MzEgMTNsMjMyIDI2NXE4IDEwIDEzIDIxLjV0NiAyNC41bDM1IDQzMXEyIDE3LTEwLjUgMzBUODM3LTgwSDU5MFptLTQ2NyAwcS0xNyAwLTI5LjUtMTNUODMtMTIzbDM1LTQzMXExLTEzIDYtMjQuNXQxMy0yMS41bDIzMi0yNjRxMTItMTQgMzAuNS0xMy41VDQzMC04NjNxMTYgMjggMTcgNTl0LTE0IDU5TDI4MC00NjZxLTUgOS03LjUgMTl0LTIuNSAyMHY3N3EwIDEzIDguNSAyMS41VDMwMC0zMjBxMTMgMCAyMS41LTguNVQzMzAtMzUwdi04Mmw2MC0xMDlxNC04IDExLTEydDE1LTRxMTggMCAyNiAxOHQ4IDM5djI5OXEwIDExLTIuNSAyMC41VDQ0MC0xNjJsLTM1IDYycS01IDktMTQuNSAxNC41VDM3MC04MEgxMjNaIiAvPgo8L3N2Zz4=",
	// 		binderId: defaultBinderId,
	// 		categoryId: politenessCategoryId
	// 	},
	// 	{
	// 		word: "merci",
	// 		imageBase64: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgcm9sZT0iaW1nIgoJcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCIgdmlld0JveD0iMCAtOTYwIDk2MCA5NjAiPgoJPHBhdGggZmlsbD0ib2tsY2goMC41NTMgMC4wMTMgNTguMDcxKSIKCQlkPSJNNTkwLTgwcS0xMSAwLTIwLjUtNS41VDU1NS0xMDBsLTM1LTYycS01LTktNy41LTE4LjVUNTEwLTIwMXYtMjk5cTAtMjEgOC0zOXQyNy0xOHE4IDAgMTQuNSA0dDEwLjUgMTJsNjAgMTA5djgycTAgMTMgOC41IDIxLjVUNjYwLTMyMHExMyAwIDIxLjUtOC41VDY5MC0zNTB2LTc3cTAtMTAtMi41LTIwdC03LjUtMTlMNTI3LTc0NXEtMTUtMjgtMTUtNTl0MTYtNThxMTMtMTUgMzItMTZ0MzEgMTNsMjMyIDI2NXE4IDEwIDEzIDIxLjV0NiAyNC41bDM1IDQzMXEyIDE3LTEwLjUgMzBUODM3LTgwSDU5MFptLTQ2NyAwcS0xNyAwLTI5LjUtMTNUODMtMTIzbDM1LTQzMXExLTEzIDYtMjQuNXQxMy0yMS41bDIzMi0yNjRxMTItMTQgMzAuNS0xMy41VDQzMC04NjNxMTYgMjggMTcgNTl0LTE0IDU5TDI4MC00NjZxLTUgOS03LjUgMTl0LTIuNSAyMHY3N3EwIDEzIDguNSAyMS41VDMwMC0zMjBxMTMgMCAyMS41LTguNVQzMzAtMzUwdi04Mmw2MC0xMDlxNC04IDExLTEydDE1LTRxMTggMCAyNiAxOHQ4IDM5djI5OXEwIDExLTIuNSAyMC41VDQ0MC0xNjJsLTM1IDYycS01IDktMTQuNSAxNC41VDM3MC04MEgxMjNaIiAvPgo8L3N2Zz4=",
	// 		binderId: defaultBinderId,
	// 		categoryId: politenessCategoryId
	// 	},
	// 	{
	// 		word: "toilettes",
	// 		imageUrl: "https://images.unsplash.com/photo-1589824783837-6169889fa20f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 		binderId: defaultBinderId,
	// 		categoryId: placesCategoryId
	// 	},
	// 	{
	// 		word: "cuisine",
	// 		imageUrl: "https://plus.unsplash.com/premium_photo-1680382578857-c331ead9ed51?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 		binderId: defaultBinderId,
	// 		categoryId: placesCategoryId
	// 	},
	// 	{
	// 		word: "chambre",
	// 		imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 		binderId: defaultBinderId,
	// 		categoryId: placesCategoryId
	// 	},
	// 	{
	// 		word: "salle de bain",
	// 		imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// 		binderId: defaultBinderId,
	// 		categoryId: placesCategoryId
	// 	},
	// ]);
}