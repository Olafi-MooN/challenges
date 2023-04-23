import { ContactHeader } from '../../components/contact-header/ContactHeader';
import { ContactList } from '../../components/contact-list/ContactList';
import { ContactsFunctions } from './ContactsFunctions';
import './Contacts.css';
import { useState } from 'react';

const contactsList = [
	{ name: 'Alef Santos', category: 'A', image: '', number: '18 4323-4324' },
	{ name: 'Esteffany Silva', category: 'E', image: '', number: '18 4323-4324' },
];

const Contacts = () => {
	const { list, contactAdd, contactDelete, contactEdit, filterList, setFilter } = ContactsFunctions({ contactsList });

	return (
		<>
			<div className="container-contacts">
				<div className="content-contacts">
					<ContactHeader onTextSearch={(e) => setFilter(e)} onClickAdd={contactAdd} onClickDelete={contactDelete} onClickEdit={contactEdit} />
					<div className="content-list-contacts">
						{Object.keys(filterList).length === 0 ? (
							<>
								{Object.keys(list).map((category) => (
									<ContactList category={category} list={list[category]} />
								))}
							</>
						) : (
							<>
								{Object.keys(filterList).map((category) => (
									<ContactList category={category} list={list[category]} />
								))}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export { Contacts };
