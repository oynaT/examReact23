export default function Contact() {
    return (
        <>
            {/* Page Content */}
            {/* Banner Starts Here */}
            <div className="heading-page header-text">
                <section className="page-heading">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-content">
                                    <h4>Contact</h4>
                                    <h2>let’s stay in touch!</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* Banner Ends Here */}
            <section className="contact-us">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="down-contact">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="sidebar-item contact-form">
                                            <div className="sidebar-heading">
                                                <h2>Send us a message</h2>
                                            </div>
                                            <div className="content">
                                                <form id="contact" action="" method="post">
                                                    <div className="row">
                                                        <div className="col-md-6 col-sm-12">
                                                            <fieldset>
                                                                <input
                                                                    name="name"
                                                                    type="text"
                                                                    id="name"
                                                                    placeholder="Your name"
                                                                    required=""
                                                                />
                                                            </fieldset>
                                                        </div>
                                                        <div className="col-md-6 col-sm-12">
                                                            <fieldset>
                                                                <input
                                                                    name="email"
                                                                    type="text"
                                                                    id="email"
                                                                    placeholder="Your email"
                                                                    required=""
                                                                />
                                                            </fieldset>
                                                        </div>
                                                        <div className="col-md-12 col-sm-12">
                                                            <fieldset>
                                                                <input
                                                                    name="subject"
                                                                    type="text"
                                                                    id="subject"
                                                                    placeholder="Subject"
                                                                />
                                                            </fieldset>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <fieldset>
                                                                <textarea
                                                                    name="message"
                                                                    rows={6}
                                                                    id="message"
                                                                    placeholder="Your Message"
                                                                    required=""
                                                                    defaultValue={""}
                                                                />
                                                            </fieldset>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <fieldset>
                                                                <button
                                                                    type="submit"
                                                                    id="form-submit"
                                                                    className="main-button"
                                                                >
                                                                    Send Message
                                                                </button>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="sidebar-item contact-information">
                                            <div className="sidebar-heading">
                                                <h2>contact information</h2>
                                            </div>
                                            <div className="content">
                                                <ul>
                                                    <li>
                                                        <h5>090-484-8080</h5>
                                                        <span>PHONE NUMBER</span>
                                                    </li>
                                                    <li>
                                                        <h5>info@company.com</h5>
                                                        <span>EMAIL ADDRESS</span>
                                                    </li>
                                                    <li>
                                                        <h5>
                                                            123 Aenean id posuere dui,
                                                            <br />
                                                            Praesent laoreet 10660
                                                        </h5>
                                                        <span>STREET ADDRESS</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div id="map">
                                {/* <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94665.26413720829!2d24.658301400707977!3d42.14409129735782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd108a248763d%3A0x6470d1fa6f1338a0!2sPlovdiv!5e0!3m2!1sen!2sbg!4v1700401087380!5m2!1sen!2sbg"
                                    width="100%"
                                    height="450px"
                                    // frameBorder={0}
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};