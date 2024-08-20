import React, { Component } from 'react';
import '../App.css';
import ReviewForm from './algorithmComponents/ReviewForm';
import ReviewSection from './algorithmComponents/ReviewSection';
import DifficultyBarChart from "./algorithmComponents/DifficultyBarChart";
import RatingBarChart from "./algorithmComponents/RatingBarChart";

const baseURL = process.env.NODE_ENV === "development"
  ? process.env.REACT_APP_LOCAL
  : process.env.REACT_APP_PROD;

const initialDifficulties = [
  { label: 1, value: 0 },
  { label: 2, value: 0 },
  { label: 3, value: 0 },
  { label: 4, value: 0 },
  { label: 5, value: 0 },
  { label: 6, value: 0 },
  { label: 7, value: 0 },
  { label: 8, value: 0 },
  { label: 9, value: 0 },
  { label: 10, value: 0 },
];

const initialRatings = [
  { label: 1, value: 0 },
  { label: 2, value: 0 },
  { label: 3, value: 0 },
  { label: 4, value: 0 },
  { label: 5, value: 0 },
  { label: 6, value: 0 },
  { label: 7, value: 0 },
  { label: 8, value: 0 },
  { label: 9, value: 0 },
  { label: 10, value: 0 },
];

class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulties: initialDifficulties,
      ratings: initialRatings,
    };
  }

  componentDidMount() {
    this.fetchCourses();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.course.title !== this.props.course.title) {
      this.fetchCourses();
    }
  }

  fetchCourses = async () => {
    this.setState({
      difficulties: initialDifficulties,
      ratings: initialRatings,
    });

    const response = await fetch(baseURL + '/api/reviews', {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
      }
    });

    const json = await response.json();
    console.log(json);

    const newDifficulties = [...initialDifficulties];
    const newRatings = [...initialRatings];

    json.forEach(review => {
      if (review.courseTitle === this.props.course.title) {
        newDifficulties.forEach(d => {
          if (d.label === review.difficulty) {
            d.value += 1;
          }
        });

        newRatings.forEach(r => {
          if (r.label === review.rating) {
            r.value += 1;
          }
        });
      }
    });

    this.setState({
      difficulties: newDifficulties,
      ratings: newRatings,
    });
  };

  render() {
    const { course } = this.props;
    const { difficulties, ratings } = this.state;

    return (
      <div className="course-details">
        <div className="details">
          <h1>{course.title}</h1>
          <p>{course.distribution}</p>
        </div>
        <div className="review--graphs">
          <div className="difficulty--graph">
            <h4>Difficulty</h4>
            <DifficultyBarChart data={difficulties} width={400} height={300} />
          </div>
          <div className="rating--graph">
            <h4>Ratings</h4>
            <RatingBarChart data={ratings} width={400} height={300} />
          </div>
        </div>
        <ReviewForm course={course} />
        <br />
        <ReviewSection course={course} />
      </div>
    );
  }
}

export default CoursePage;
