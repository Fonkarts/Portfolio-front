const Contact = () => {
    return (
        <footer className="contact" id="contact">
            <h2 className="contact__title">Contactez moi</h2>
            <div>
                {/* CDN GMaps ? */}
                <p>LinkedIn</p>
                <p>Github</p>
                <form>
                    <label htmlFor="id1">Nom</label>
                    <input id="id1"></input>
                    <label htmlFor="id2">Mail</label>
                    <input id="id2"></input>
                    <label htmlFor="id3">Message</label>
                    <input id="id3"></input>
                    <button>Envoyer</button>
                </form>
            </div>
        </footer>
    )
}

export default Contact;