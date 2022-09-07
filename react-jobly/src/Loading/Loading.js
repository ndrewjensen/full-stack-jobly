import './Loading.css'

/**Loading component
 *
 * {Companies, Jobs, CompanyPage} -> Loading
 */

function Loading() {
  return (
    <div className="spinner-border Loading" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loading;
