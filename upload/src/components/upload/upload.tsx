import { UploadFunctions } from './upload.functions';
import CloudIcon from '../../assets/CloudArrowUp.svg';
import FailedProgressIcon from '../../assets/FailedProgress.svg';
import FinishProgressIcon from '../../assets/FinishedProgress.svg';
import InProgressIcon from '../../assets/InProgress.svg';
import CloseIcon from '../../assets/Close.svg';
import ReloadIcon from '../../assets/Reload.svg';
import './upload.css';

const Upload = () => {
	const { dropHandler, dragOverHandler, files, abortList, reloadUploadFile } = UploadFunctions();
	return (
		<>
			<div className="container-upload">
				<div id="drop_zone" onDrop={dropHandler} onDragOver={dragOverHandler}>
					<img src={CloudIcon} alt="Cloud Icon React" />
					<h1 className="upload-drag-title">Importe seus arquivos</h1>
					<p className="secondary-text">Arraste ou clique para fazer upload</p>
				</div>
				<div className="container-list-files">
					{files.map((_, key) => (
						<>
							<div className="content-card-list-files">
								<div className="thumb-image">
									<img src={_?.status === 'IN_PROGRESS' ? InProgressIcon : _?.status === 'FINISH_PROGRESS' ? FinishProgressIcon : FailedProgressIcon} alt="In Progress React" />
								</div>
								<div className="content-file">
									<div className="file-title primary-text">{_.name}</div>
									<div className="file-size secondary-text">{_.sizeFormatted}</div>
									<div className="file-progress">
										<div className="bar-progress">
											<div className={`file-progress-bg ${_?.status?.toLowerCase()}`} style={{ width: `${_.progress ?? 0}%` }}></div>
										</div>
										<div className="count-progress secondary-text">{`${_.progress ?? 0}%`}</div>
									</div>
								</div>

								<div className="handle-action-upload">
									{_.status === 'FAILED_PROGRESS' ? (
										<img src={ReloadIcon} onClick={() => reloadUploadFile(_)} alt="Fechar" style={{ cursor: 'pointer' }} />
									) : (
										<img src={CloseIcon} onClick={() => abortList[key].cancel(_.uuid)} alt="Fechar" style={{ cursor: 'pointer' }} />
									)}
								</div>
							</div>
						</>
					))}
				</div>
			</div>
		</>
	);
};

export { Upload };
