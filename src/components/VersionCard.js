
const VersionCard = ({ id, tag_name, download_count, published_at, name, uploader, avatar, html_url }) => {
    return ( 
            
            <div className="courses-container">
            <div className="course">
                <div className="course-preview">
                        <h6>{name}</h6>
                        <h2>{tag_name}</h2>
                    <a href="#">{published_at} <i className="fas fa-chevron-right"></i></a>
                    </div>
                <div className="course-info">
                    <div className="progress-container">
                        <img src={avatar} alt="profile" className="avatar mobile-avatar" /> 
                        </div>
                        <h6>{uploader}</h6>
                        <h2>{download_count} Downloads</h2>
                         
                        <a href={html_url} target="_blank">Open Page</a> 
                    </div>
                </div>
            </div>  
    )

}

export default VersionCard;

{/* <div className="card">
                <span>{tag_name}</span>
                <span>{name}</span>
                <span>{uploader}</span>
                <img src={avatar} alt="profile" className="avatar" />
                <span>{html_url}</span>
                <div className="download-count">{download_count}</div>
                <div className="note-footer">
                    <small>{published_at}</small>
                </div>
            </div> */}