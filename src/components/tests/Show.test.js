import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const exampleShow = {
    name: "My Hero Academia",
    image: "https://static.tvtropes.org/pmwiki/pub/images/bc49d565_6992_4c25_9dfb_f3e2c7254a07.png",
    summary: "Academies across the globe train their students to learn to fight crime with their powers. Izuku Midoriya, a boy born without any powers, dreams of being able to become a super hero too, but gets bullied for his unrealistic dreams.",
    seasons: [
        { id: 0, name: "Season 1", episodes: [
            {
                airdate: "2016-04-03",
                airstamp: "2016-04-03T12:00:00+00:00",
                airtime: "",
                id: 553946,
                image: "https://img1.ak.crunchyroll.com/i/spire3-tmb/25d40698c5c58c5f0ba0d2daf19745161487058772_full.jpg",
                name: "Izuku Midoriya: Origin",
                number: 1,
                rating: { average: 8.6 },
                runtime: 24,
                season: 1,
                summary:
                    "Izuku has always dreamed of becoming a hero. One day, he is attacked by a villain but is unexpectedly rescued by his idol, All Might..",
                type: "regular",
                url: "https://myheroacademia.fandom.com/wiki/Episode_1"
            }
        ]},
        { id: 1, name: "Season 2", episodes: []},
        { id: 2, name: "Season 3", episodes: []},
        { id: 3, name: "Season 4", episodes: []},
        { id: 4, name: "Season 5", episodes: []},
        { id: 5, name: "Season 6", episodes: []},
    ]
}


test('renders without errors', () => { 
    render(<Show show={exampleShow} selectedSeason={"none"}/>)
});


test('renders Loading component when prop show is null', () => { 
    render(<Show show={null}/>)
    const loading = screen.getByTestId("loading-container");
    expect(loading).toBeInTheDocument();
});


/*
 Test that when your test data is passed through the show prop, the same number of season select options appear as there are seasons within your test data.
*/
// data-testid="season-option"
test('renders same number of options seasons are passed in', () => {
    render (<Show show={exampleShow} selectedSeason={"none"} />)
    const seasons = screen.getAllByTestId("season-option");

    expect(seasons).toHaveLength(exampleShow.seasons.length);

});


// Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select DOM element and userEvent reference materials to see how to trigger a selection.
test('handleSelect is called when an season is selected', () => { 

});

// Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.
test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender, queryByText } = render(<Show show={exampleShow} selectedSeason={"none"}/>)

    expect(queryByText(exampleShow.seasons[0].episodes[0])).not.toBeInTheDocument();

    rerender(<Show show={exampleShow} selectedSeason={0}/>)

    expect(screen.queryByText(exampleShow.seasons[0].episodes[0].name)).toBeInTheDocument();

});
