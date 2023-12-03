import { PostCard } from "./post-card/PostCard";

export default function PostCatalog({
    posts,
}) {
    return (
        <>
            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>All blog posts</h4>
                                    <h2>Our Recent Blog</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="blog-posts grid-system">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="all-blog-posts">
                                <div className="row">

                                    {posts.map(p =>
                                        <PostCard key={p._id} {...p} />
                                    )}
                                    {posts.length === 0 && (
                                        <h3 className="no-articles">No articles yet</h3>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4">
                            <div className="sidebar">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="sidebar-item search">
                                            <form id="search_form" name="gs" method="GET" action="#">
                                                <input
                                                    type="text"
                                                    name="q"
                                                    className="searchText"
                                                    placeholder="type to search..."
                                                    autoComplete="on"
                                                />
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="sidebar-item recent-posts">
                                            <div className="sidebar-heading">
                                                <h2>Recent Posts</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    <li>
                                                        <a href="post-details.html">
                                                            <h5>
                                                                Vestibulum id turpis porttitor sapien facilisis
                                                                scelerisque
                                                            </h5>
                                                            <span>May 31, 2020</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="post-details.html">
                                                            <h5>
                                                                Suspendisse et metus nec libero ultrices varius eget
                                                                in risus
                                                            </h5>
                                                            <span>May 28, 2020</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="post-details.html">
                                                            <h5>
                                                                Swag hella echo park leggings, shaman cornhole
                                                                ethical coloring
                                                            </h5>
                                                            <span>May 14, 2020</span>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* <div className="col-lg-12">
                                        <div className="sidebar-item categories">
                                            <div className="sidebar-heading">
                                                <h2>Categories</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    <li>
                                                        <a href="#">- Nature Lifestyle</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">- Awesome Layouts</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">- Creative Ideas</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">- Responsive Templates</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">- HTML5 / CSS3 Templates</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">- Creative &amp; Unique</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="sidebar-item tags">
                                            <div className="sidebar-heading">
                                                <h2>Tag Clouds</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    <li>
                                                        <a href="#">Lifestyle</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Creative</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">HTML5</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Inspiration</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Motivation</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">PSD</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">Responsive</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};