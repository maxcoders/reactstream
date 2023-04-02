import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Nav2 from "../components/Nav2";
import { socket } from "../utils/set";
export default function F() {
  const [socketDataList, setSocketDataList] = useState([]);
  const [viewlink, setviewLink] = useState([]);
  useEffect(() => {
    socket.emit("getrooms");
    socket.on("rooms", (data) => {
      setSocketDataList((prevList) => [...prevList, data]);
    });
    return () => socket.disconnect();
  }, [socket]);
  return (
    <div className="fr fwh bg1">
      <Nav />

      <div className="f1">
        {socketDataList.length > 0 && socketDataList[0].length > 0 ? (
          socketDataList.map((data, index) => {
            return (
              <a href={`./view/${data[0].id}`} key={index}>
                <p>{index}</p>
                <p>{data[0].name}</p>
                <img src={data[0].img} />
              </a>
            );
          })
        ) : (
          <div>empty</div>
        )}
      </div>
      <Nav2 />
    </div>
  );
}
