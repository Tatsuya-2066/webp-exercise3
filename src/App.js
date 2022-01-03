import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
        <header className="hero is-dark is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Dog Gallary</h1>
                </div>
            </div>
        </header>
    );
  }

function Image(props) {
    let {url} = props;
    return (
        <div className="card">
            <div className="card-image">
                <div className="image">
                    <img src={url} alt="dog"></img>
                </div>
            </div>
        </div>
    )
}

function Loading() {
    const styles = {"color": "black", "fontSize": "30px"};
    return (
        <div style={styles}>Loading...</div>
    )
}

function Gallery(props) {
    const {urls} = props;
    if(urls == null) {
        return <Loading />;
    }
    return (
        <div className="columns is-vcentered is-multiline">
            {urls.map((url) => {
                return (
                    <div key={url} className="column is-half">
                        <Image url={url}/>
                    </div>
                );
            })}
        </div>
    );
}

function Form(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const { breed } = event.target.elements;
        props.onFormSubmit(breed.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <div className="select is-multiple is-fullwidth">
                            <select name="breed" defaultValue="shiba">
                                <option value="random">Random</option>
                                <option value="african">African</option>
                                <option value="akita">Akita</option>
                                <option value="beagle">Beagle</option>
                                <option value="briard">Briard</option>
                                <option value="chihuahua">Chihuahua</option>
                                <option value="clumber">Clumber</option>
                                <option value="coonhound">Coonhound</option>
                                <option value="dhole">Dhole</option>
                                <option value="doberman">Doberman</option>
                                <option value="havanese">Havanese</option>
                                <option value="husky">Husky</option>
                                <option value="shiba">Shiba</option>
                            </select>
                        </div>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-dark">
                            Reload
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
  
function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
        fetchImages("random").then((urls) => {
            setUrls(urls);
        });
    }, []);

    function reloadImages(breed) {
        fetchImages(breed).then((urls) => {
            setUrls(urls);
        });
    }

    return (
        <main className="mx-6 has-background-link">
            <section className="section">
                <div className="container">
                    <Form onFormSubmit={reloadImages} />
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Gallery urls={urls} />
                </div>
            </section>
        </main>
    );
}

function TopBtn() {
    const styles = {position: "fixed", bottom: 10, right: 10};
    function scrollToTop() {
        window.scrollTo({
            top:0,
            behavior: "smooth"
        });
    }

    return (
        <button style={styles} className="top_btn button is-rounded" onClick={scrollToTop}>TOP</button>
    )
}
  
function Footer() {
    return (
        <footer className="footer has-background-grey-lighter">
            <div className="content has-text-centered">
                <p>Dog images are retrieved from Dog API</p>
                <p>
                    <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
                </p>
                <p>横山竜也 5420066</p>
                <p>日本大学文理学部情報科学科Webプログラミングの演習課題</p>
            </div>
        </footer>
    );
}
  
function App() {
    return (
        <div>
            <Header />
            <Main />
            <TopBtn />
            <Footer />
        </div>
    );
}
  
  export default App;