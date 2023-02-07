import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow.js'
jest.mock('./../../api/fetchShow.js');

test('renders without errors with no props', async () => { 
    render(<Display />)
});

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display />)
    const button = screen.getByRole("button");
    fireEvent.click(button);

    const show = await screen.findByTestId("show-container");

    expect(show).toBeInTheDocument();    
});

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
        const seasons = screen.getAllByTestId("season-option");
        expect(seasons).toHaveLength(testShow.seasons.length);
    })
 });

 // Test that when the fetch button is pressed, this functional prop passed to the Display component client code is called.
test('calls functional prop passed to display component when button is pressed', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    await waitFor(() => {
        expect(displayFunc).toBeCalled();
    })
});


const testShow = {
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
                    "Izuku has always dreamed of becoming a hero. One day, he is attacked by a villain but is unexpectedly rescued by his idol, All Might.",
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