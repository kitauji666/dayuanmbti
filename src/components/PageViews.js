import { Pagination } from "react-bootstrap";
import { useState } from "react";
import AnimeCard from "./AnimeCard";
import "../CSS/PageViews.css";
import "bootstrap/dist/css/bootstrap.css";
import { useWindowSize } from "react-use";

function PageViews(props) {
  const { items } = props;
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(items.length / pageSize);
  const { width } = useWindowSize();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const displayedItems = items.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bangumi-recomm-page">
      <h1 className="bangumi-recomm-header">{props.name}推荐的动画</h1>
      <div className="bangumi-recomm-bangumi-mainpage-link">
        <a href={`https://bangumi.tv/user/${props.id}`} target="_blank">
          {props.name}的Bangumi主页
        </a>
      </div>
      {displayedItems.map((item) => (
        <AnimeCard
          user={props.name}
          key={item.subject_id}
          comment={item.comment}
          subjectId={item.subject_id}
          userrate={item.rate}
        />
      ))}
      <div style={{ display: "block" }}>
        {width <= 576 && (
          <Pagination className="justify-content-center">
            <Pagination.First
              active={0 === currentPage}
              onClick={() => handlePageChange(1)}
            />
            <Pagination.Prev
              onClick={() =>
                handlePageChange(currentPage === 1 ? 1 : currentPage - 1)
              }
            />
            <Pagination.Item
              key={currentPage}
              active={true}
              onClick={() => handlePageChange(currentPage)}
            >
              {currentPage}
            </Pagination.Item>
            {pagesCount !== currentPage && <Pagination.Item
              key={currentPage + 1}
              active={false}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              {currentPage + 1}
            </Pagination.Item>}
            {pagesCount !== currentPage && pagesCount - 1 !== currentPage && <Pagination.Item
              key={currentPage + 2}
              active={false}
              onClick={() => handlePageChange(currentPage + 2)}
            >
              {currentPage + 2}
            </Pagination.Item>}
            <Pagination.Next
              onClick={() =>
                handlePageChange(
                  currentPage === pagesCount ? pagesCount : currentPage + 1
                )
              }
            />
            <Pagination.Last
              active={pagesCount === currentPage}
              onClick={() => handlePageChange(pagesCount)}
            />
          </Pagination>
        )}
        {width > 576 && (
          <Pagination className="justify-content-center">
            <Pagination.First
              active={0 === currentPage}
              onClick={() => handlePageChange(1)}
            />
            <Pagination.Prev
              onClick={() =>
                handlePageChange(currentPage === 1 ? 1 : currentPage - 1)
              }
            />
            {Array.from({ length: pagesCount }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                handlePageChange(
                  currentPage === pagesCount ? pagesCount : currentPage + 1
                )
              }
            />
            <Pagination.Last
              active={pagesCount === currentPage}
              onClick={() => handlePageChange(pagesCount)}
            />
          </Pagination>
        )}
      </div>
    </div>
  );
}
export default PageViews;
