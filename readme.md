# Opera Speed Dial extension for DuckDuckGo

This is an extension for Opera that adds a Speed Dial window to display random Zero-click Info from DuckDuckGo. Random article titles are fetched from Wikipedia and the DuckDuckGo API is used to get the abstract for a search of that title.

## Example

The text fades out and a query is sent to Wikipedia for a random article title. The Wikipedia API returns `John Porter Hatch`. The DuckDuckGo API is then queried with `John Porter Hatch`, returning:

	John Porter Hatch (January 9, 1822 – April 12, 1901) was a career American soldier who served as general in the Union Army during the American Civil War.

The search and abstract are updated in the Speed Dial window and they fade back in to reveal the new text. The URL and title of the window itself are then updated.