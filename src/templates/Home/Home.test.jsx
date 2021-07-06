import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
          url: 'img2.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
          url: 'img3.jpg',
        },
        {
          userId: 4,
          id: 4,
          title: 'title 4',
          body: 'body 4',
          url: 'img4.jpg',
        },
        {
          userId: 5,
          id: 5,
          title: 'title 5',
          body: 'body 5',
          url: 'img5.jpg',
        },
        {
          userId: 6,
          id: 6,
          title: 'title 6',
          body: 'body 6',
          url: 'img6.jpg',
        },
        {
          userId: 7,
          id: 7,
          title: 'title 7',
          body: 'body 7',
          url: 'img7.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('There are no posts');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(6);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument(3);
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('There are no posts');

    expect.assertions(12);

    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 3' })).toBeInTheDocument();

    userEvent.type(search, 'title 1');
    // "get" raises errors if element does not exist
    expect(screen.getByRole('heading', { name: 'Search Value: title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title 3' })).not.toBeInTheDocument();

    // "query" not raises errors if element does not exist
    expect(screen.queryByRole('heading', { name: 'title 4' })).not.toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title 3' })).toBeInTheDocument();

    userEvent.type(search, 'blabla');
    expect(screen.getByText('There are no posts')).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('There are no posts');

    //expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument(3);

    userEvent.click(button);
    expect(screen.queryByRole('heading', { name: 'title 7' })).toBeInTheDocument();
  });
});
