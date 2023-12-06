import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as blogService from "../../services/blogService";
import { PostCard } from "../post-catalog/post-card/PostCard";

export default function Search() {
    const [posts, setPosts] = useState([]);
    const [isSearching, setSearching] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const query = searchParams.get("title") || "";

    const handleSearchTerm = (e) => {
        e.preventDefault();
        let title = e.target.value;

        if (title) {
            setSearchParams({ title });
            setSearchTerm(title);
        } else {
            setSearchParams({});
            setSearchTerm("");
            setSearching(false);
        }
    };

    const submitSearch = (e) => {
        e.preventDefault();
        if (query) {
            setTimeout(() => {
                blogService.search(searchTerm).then((result) => setPosts(result));
                setSearching(true);
            }, 600);
        } else if (searchTerm.length === 0) {
            blogService.getAll().then((result) => setPosts(result));
        }
    };

    return (
        <>
            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>Search</h4>
                                    <h2>Search in our blog</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="search-section">
                <div className="search-container">
                    <form
                        className="search-search-container"
                        method="get"
                        onSubmit={submitSearch}>
                        <input
                            className="search-search"
                            type="text"
                            placeholder="Search by Name or Category"
                            name="text"
                            value={searchTerm}
                            onChange={handleSearchTerm}
                        ></input>
                        <button className="search-search-btn">Search</button>
                    </form>
                    {isSearching ? (
 <div className="search-result-container">
 <h2 className="search-title">Search Results</h2>
                        <section className="blog-posts grid-system">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-xs-12">
                                        <div className="all-blog-posts">
                                            <div className="row">
                                               
                                                    {posts.length > 0 ? (
                                                        posts.map((post) => <PostCard key={post._id} {...post} />)
                                                    ) : (
                                                        <h3
                                                            style={{
                                                                color: "black",
                                                                textAlign: "center",
                                                                width: "100%",
                                                                fontSize: "2rem",
                                                            }}
                                                        >
                                                            No results found
                                                        </h3>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </section>
                            </div>
                       
                    ) : (
                        ""
                    )}
                </div>
            </section>
        </>
    );
};

