import { Contact } from '../../Models/Contacts';
import './ContactList.css';

interface IContactListProps {
	category: string;
	list: Contact[];
}

const ContactList = (props: IContactListProps) => {
	const { category, list } = props;
	return (
		<>
			<div className="container-contact-list">
				<div className="content-list-block">
					<div className="content-block-character">{category}</div>
					<div className="content-contact-list">
						{list.map((contact) => (
							<>
								<div className="content-contact">
									<img className="contact-photo" src={contact.image ? contact.image : 'https://cdn-icons-png.flaticon.com/512/6073/6073874.png'} alt="photo-perfil" />
									<div className="contact-name-number">
										<h3 className="contact-name">{contact.name}</h3>
										<p className="contact-number">{contact.number}</p>
									</div>
								</div>
							</>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export { ContactList };
