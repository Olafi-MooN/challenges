import './ContactHeader.css';
import { FaUserEdit, FaUserPlus, FaUserTimes } from 'react-icons/fa';

interface IContactHeaderProps {
	onClickAdd: () => void;
	onClickEdit: () => void;
	onClickDelete: () => void;
	onTextSearch: (a: string) => void;
}

const ContactHeader = (props: IContactHeaderProps) => {
	const { onClickAdd, onClickDelete, onClickEdit, onTextSearch } = props;
	return (
		<>
			<div className="container-header-contact">
				<div className="content-header-title-actions">
					<div className="content-header-title">Meus Contatos</div>
					<div className="content-header-actions">
						<div onClick={onClickAdd}>
							<FaUserPlus />
						</div>
						<div onClick={onClickEdit}>
							<FaUserEdit />
						</div>
						<div onClick={onClickDelete}>
							<FaUserTimes />
						</div>
					</div>
				</div>
				<div className="content-header-search">
					<input onChange={(e) => onTextSearch(e.target.value)} className="content-header-search-input" type="text" placeholder="Busque por nome ou por dados de contato..." />
				</div>
			</div>
		</>
	);
};

export { ContactHeader };
