import { useEffect } from "react";
import { useState, useRef } from "react";

export default function Link({ docId, title, url, onDelete, onUpdate }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    if (urlRef.current) {
      urlRef.current.focus();
    }
  }, [editUrl]);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [editTitle]);

  function handleEditTitle() {
    setEditTitle(true);
  }

  function handleEditUrl() {
    setEditUrl(true);
  }

  function handleChanseTitle(e) {
    setCurrentTitle(e.target.value);
  }

  function handleChanseUrl(e) {
    setCurrentUrl(e.target.value);
  }

function handleBluerTitle (e){
setEditTitle(false);
onUpdate(docId, currentTitle, currentUrl);
}

function handleBluerUrl (e){
  setEditUrl(false)
  onUpdate(docId, currentTitle, currentUrl);

}

function handleDelete(){
  onDelete(docId);
}

  return (
    <div key={docId}>
      <div>
        <div>
          {editTitle ? (
            <>
              <input
                ref={titleRef}
                value={currentTitle}
                onChange={handleChanseTitle}
                onBlur={handleBluerTitle}

              />
            </>
          ) : (
            <>
              <button onClick={handleEditTitle}>Editar</button>
              {currentTitle}
            </>
          )}
        </div>
        <div>
          {editUrl ? (
            <>
              <input
                ref={urlRef}
                value={currentUrl}
                onChange={handleChanseUrl}
                onBlur={handleBluerUrl}
              />
            </>
          ) : (
            <>
              <button onClick={handleEditUrl}>Editar</button>
              {currentUrl}
            </>
          )}
        </div>
      </div>
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
