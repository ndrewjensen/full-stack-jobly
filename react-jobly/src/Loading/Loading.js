import './Loading.css'

/**Loading component
 *
 * {Companies, Jobs, CompanyPage} -> Loading
 */

function Loading() {
  return (
    <div className="Loading" role="status">
      <span className="sr-only spinner-border Loading"></span>
      <span>Loading...</span>
    </div>
  );
}

export default Loading;
