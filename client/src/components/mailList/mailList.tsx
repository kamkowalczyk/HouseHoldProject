import './mailList.css'

const MailList = () => {
    return (
      <div className="mail">
        <h1 className="mailTitle">Oszczędzaj czas i pieniądze!</h1>
        <span className="mailDesc">Zapisz się do newslettera, a wyślemy Ci najlepsze oferty</span>
        <div className="mailInputContainer">
          <input type="text" placeholder="Twoj email" />
          <button>Subskrybuj</button>
        </div>
      </div>
    )
  }

export default MailList