import { Component } from 'react';
import { Button } from '../../components/Button';
import { Posts } from '../../components/Posts';
import { TextInput } from '../../components/TextInput';
import { loadPosts } from '../../util/load-post';
import './styles.css';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: '',
  }

  componentDidMount() {
    console.log('Componente sendo montado');
    this.loadPosts();
  }

  loadPosts = async () => {
    const { postsPerPage, page } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      posts,
      allPosts,
      page,
      postsPerPage
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
  }

  render() {
    const {
      posts,
      page,
      postsPerPage,
      allPosts,
      searchValue
    } = this.state;

    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = searchValue ?
      allPosts.filter(post => {
        return post.title
          .toLowerCase()
          .includes(searchValue
            .toLocaleLowerCase())
      })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <>
              <h1>Search Value: {searchValue}</h1>
            </>
          )}
          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>There are no posts</p>
        )}

        <div className="button-container">
          {!searchValue && (
            <Button
              title={'Load more posts'}
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}