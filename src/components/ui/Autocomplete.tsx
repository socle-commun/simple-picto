import { ChangeEvent, useState } from "react";

interface Suggestion {
	label: string;
	value: unknown;
}

interface AutocompleteProps {
	suggestions: Suggestion[];
}

export default function Autocomplete({ suggestions }: AutocompleteProps) {
	const [query, setQuery] = useState("");
	const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		setQuery(input);

		if (input) {
			const filtered = suggestions.filter((suggestion) =>
				suggestion.label.toLowerCase().includes(input.toLowerCase())
			);
			setFilteredSuggestions(filtered);
			setShowSuggestions(true);
		} else {
			setShowSuggestions(false);
		}
	};

	const handleSelect = (suggestion: string) => {
		setQuery(suggestion);
		setShowSuggestions(false);
	};

	return (
		<div className="autocomplete">
			<input
				type="text"
				value={query}
				onChange={handleChange}
				placeholder="Search..."
			/>
			{showSuggestions && (
				<ul className="suggestions">
					{filteredSuggestions.length > 0 ? (
						filteredSuggestions.map((suggestion, index) => (
							<li key={index} onClick={() => handleSelect(suggestion.label)}>
								{suggestion.label}
							</li>
						))
					) : (
						<li>No suggestions found</li>
					)}
				</ul>
			)}
		</div>
	);
};
