import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/database/entities/contact.entity';
import { Tag } from 'src/database/entities/tag.entity';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  async getUser(name: string) {
    const user = await this.userRepository.findOne({
      where: { username: name },
    });
    if (user) {
      return {
        success: true,
        user,
      };
    } else {
      return {
        success: false,
        error: 'User not found',
      };
    }
  }

  async createContact(
    name: string,
    userName: string,
    homePhone?: string,
    workPhone?: string,
    email?: string,
    address?: string,
    tags?: string[],
  ) {
    console.log(name, homePhone, workPhone, email, address, tags)
    try {
        const existingUser = await this.getUser(userName)
        if (!existingUser.user) {
            return {
                success: false,
                error: 'User does not exist!'
            }
        }
        const existingContact = await this.contactRepository.findOne({
            where: {
                name: name,
                userId: existingUser.user.id
            }
        })
        if (existingContact) {
            return {
                success: false,
                error: 'Contact already exists!'
            }
        }
        const newContact = new Contact();
        newContact.name = name;
        newContact.tags = tags;
        newContact.address = address;
        newContact.email = email;
        newContact.homePhone = homePhone;
        newContact.workPhone = workPhone;
        newContact.userId = existingUser.user.id;
        newContact.user = existingUser.user;

        const savedUser = await this.contactRepository.save(newContact);

        return {
            success: true,
            user: savedUser
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            error: error.message
        }
    }
  }

  async getContacts(userName: string) {
    const existingUser = await this.userRepository.findOne({
        where: {
            username: userName
        },
        relations: {
            contacts: true
        }
    })

    if (!existingUser) {
        return {
            success: false,
            error: 'User does not exist'
        }
    }

    return {
        success: true,
        contacts: existingUser.contacts
    }
  }

  async removeContact(userName: string, contactId: string) {
    const userExists = await this.userRepository.findOne({
        where: {
            username: userName
        },
        relations: {
            contacts: true
        }
    })

    if (!userExists) {
        return {
            success: false,
            error: 'User does not exist!'
        }
    }

    if (!userExists.contacts.find(el => contactId)) {
        return {
            success: false,
            error: 'Contact does not exist!'
        }
    }

    const contact = userExists.contacts.filter(el => el.id === parseInt(contactId))

    await this.contactRepository.delete({
        id: contact[0].id
    })

    return {
        success: true
    }
  }

  async createTag(userName: string, tagName: string) {
    try {
        const existingUser = await this.userRepository.findOne({
            where: {
                username: userName
            }
        })
        if (!existingUser) {
            return {
                success: false,
                error: 'User does not exist!'
            }
        }
        const newTag = new Tag()
        newTag.name = tagName
        const savedTag = await this.tagRepository.save(newTag)

        return {
            success: true,
            tag: newTag
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error
        }
    }
  }

  async getTags(userName: string) {
    try {
        const existingUser = await this.userRepository.findOne({
            where: {
                username: userName
            }
        })

        if (!existingUser) {
            return {
                success: false,
                error: 'User does not exist!'
            }
        }

        const tags = await this.tagRepository.find()

        return {
            success: true,
            tags
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error
        }
    }
  }
}
