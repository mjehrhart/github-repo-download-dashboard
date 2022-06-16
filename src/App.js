import React, { useState, useEffect } from 'react';
import axios from "axios";
import VersionCard from './components/VersionCard';
import Search from './components/Search'
import './App.css';

const App = () => {

  const [repo, setRepo] = useState("");
  const [repoPath, setRepoPath] = useState("");
  const [dataAPI, setDataAPI] = useState([]);
  const [totalDownloads, setTotalDownloads] = useState(0);

  const onHandlerChange = (text) => {
    setRepo(text.trim());
    let url = "https://vkcfnl0zsi.execute-api.us-west-2.amazonaws.com/Prod/?userrepo=" + text.trim();
    setRepoPath(url);
  }

  const onHandlerClick = (e) => {

    axios.get(repoPath)
      .then((response) => {

        if (!response.data) {
          setDataAPI([]);
          setTotalDownloads(0);
          return null;
        }

        //Setup data struct
        var structured = {};
        structured.assets = [];
        structured.total_downloads = 0;

        //Transform data structure
        var unique_id = 0;
        let data = response.data;

        //console.log(103, response.data);

        for (var x in data) {
          for (var y in data[x].assets) {

            var date = new Date(data[x].published_at);
            var date_formatted = (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear());

            var asset = {
              name: data[x].assets[y].name,
              html_url: data[x].html_url,
              uploader: data[x].assets[y].uploader.login,
              avatar: data[x].assets[y].uploader.avatar_url,
              id: unique_id++,
              tag_name: data[x].tag_name,
              download_count: data[x].assets[y].download_count,
              published_at: date_formatted,
            }

            structured.assets.push(asset);
            structured.total_downloads += data[x].assets[y].download_count;
          }
        }

        setDataAPI(structured.assets);
        setTotalDownloads(structured.total_downloads);

        //console.log(100, structured.assets);

        //****** */
      })
      .catch(function (error) {
        setDataAPI([]);
        setTotalDownloads(0);

        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }

      });
  }

  const onHandlerClearRepoText = () => {
    setRepo("");
    setRepoPath("");
  }

  React.useEffect(() => {
    const loadRepoPath = JSON.parse(
      localStorage.getItem('github-down-app-repoPath')
    );
    if (loadRepoPath && loadRepoPath.trim().length > 0) {
      setRepoPath(loadRepoPath);
    }

    const loadRepo = JSON.parse(
      localStorage.getItem('github-down-app-repo')
    );
    if (loadRepo && loadRepo.trim().length > 0) {
      setRepo(loadRepo);
    }

  }, []);  //emopty array tells it to load only once (when app loads)

  React.useEffect(() => {
    localStorage.setItem(
      'github-down-app-repoPath',
      JSON.stringify(repoPath)
    );

    localStorage.setItem(
      'github-down-app-repo',
      JSON.stringify(repo)
    );

  }, [repoPath]);

  return (
    <>
      <div className='top-panel'></div>
      <div className='container'>
        <div className='header'>
          <h1>Repository Release Downloads</h1>
          {/* <h3>{repoPath}</h3> */}
        </div>
        <Search
          placeholder='username/repo'
          onHandlerChange={onHandlerChange}
          onHandlerBlur={onHandlerClick}
          defaultValue={repo}
          onHandlerClearRepoText={onHandlerClearRepoText}
        />
        <div className='dl'>
          Total Downloads: {totalDownloads}
        </div>

        <div className="card-listZZZ">
          {dataAPI.map((dpi) => (
            <VersionCard key={dpi.id}
              name={dpi.name}
              html_url={dpi.html_url}
              avatar={dpi.avatar}
              uploader={dpi.uploader}
              tag_name={dpi.tag_name}
              download_count={dpi.download_count}
              published_at={dpi.published_at} />
          ))
          }
        </div>

      </div>
      <div className='note-footer'>
        <a
          href="https://github.com/mjehrhart/github-repo-download-dashboard"
          className='note-github'
          target={"_blank"}>
          View Code on Githup</a>

      </div>
    </>
  );
}

export default App;
