import { PostCard } from "./post-card/PostCard";
import * as blogService from '../../services/blogService';
import { useState, useEffect } from "react";

export default function PostCatalog({}) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        blogService.getAll()
            .then(result => {
                setPosts(result)
            })
    }, []);

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
                        <div className="col-lg-12">
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
                        
                    </div>
                </div>
            </section>
        </>

    );
};