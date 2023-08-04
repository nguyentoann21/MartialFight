import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaPlus,
  FaSearch,
  FaSyncAlt,
  FaTrash,
  FaEdit,
  FaEye,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import './adminItem.scss';

const AdminItem = () => {
  const account = JSON.parse(localStorage.getItem('ADMIN_DATA'));
  const history = useNavigate();

  useEffect(() => {
    if (!account) {
      history('/');
    }
  }, [account, history]);

  const ITEM_PER_PAGE = 10;
  const [items, setItems] = useState([]);
  const [sects, setSects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [defaultSect, setDefaultSect] = useState(null);
  const [defaultCategory, setDefaultCategory] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMode, setDialogMode] = useState('create');
  const [nullMode, setNullMode] = useState('');
  const [currentItem, setCurrentItem] = useState({
    itemName: '',
    itemDescription: '',
    image: null,
    gold: '',
    diamond: '',
    itemType: '',
    equipped: false,
    sectID: '',
    categoryID: '',
  });

  const [message, setMessage] = useState('');
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [itemRemoved, setItemRemoved] = useState(null);
  const [viewDialogVisible, setViewDialogVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageSearch, setMessageSearch] = useState('');
  const [originalItem, setOriginalItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredItem, setFilteredItem] = useState([]);
  const startIndex = (currentPage - 1) * ITEM_PER_PAGE;
  const endIndex = startIndex + ITEM_PER_PAGE;
  const currentItemPage = filteredItem.slice(startIndex, endIndex);
  const [sortType, setSortType] = useState('all');
  const [dialogMessage, setDialogMessage] = useState(false);

  const showDeleteDialog = (item) => {
    setItemRemoved(item);
    setDeleteDialogVisible(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setItemRemoved(null);
    loadItem();
  };

  useEffect(() => {
    setFilteredItem(items);
  }, [items, searchTerm]);

  useEffect(() => {
    return () => {
      if (currentItem.image && currentItem.image[0]) {
        window.URL.revokeObjectURL(currentItem.image[0]);
      }
    };
  }, [currentItem.image]);

  const loadItem = async () => {
    try {
      const response = await axios.get('https://localhost:7052/api/mf/items');
      setItems(
        response.data.map((item) => {
          return {
            ...item,
            image: item.image ? item.image : null,
            sectName: item.itemSect ? item.itemSect.sectName : '',
            categoryName: item.itemCategory
              ? item.itemCategory.categoryName
              : '',
          };
        })
      );
      setOriginalItem(
        response.data.map((item) => {
          return {
            ...item,
            image: item.image ? item.image : null,
            sectName: item.itemSect ? item.itemSect.sectName : '',
            categoryName: item.itemCategory
              ? item.itemCategory.categoryName
              : '',
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadItem();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://localhost:7052/api/mf/items');
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSects = async () => {
      try {
        const response = await axios.get('https://localhost:7052/api/mf/sects');
        setSects(response.data);
        if (response.data.length > 0) {
          setDefaultSect(response.data[0].sectID);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://localhost:7052/api/mf/categories'
        );
        setCategories(response.data);
        if (response.data.length > 0) {
          setDefaultCategory(response.data[0].categoryID);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchItems();
    fetchSects();
    fetchCategories();
  }, [defaultSect, defaultCategory]);

  const actionItem = async () => {
    const formData = new FormData();

    const original = originalItem.find(
      (item) => item.itemID === currentItem.itemID
    );

    if (dialogMode === 'update') {
      formData.append('itemID', currentItem.itemID);

      if (
        currentItem.itemName !== original.itemName ||
        currentItem.itemDescription !== original.itemDescription ||
        currentItem.gold !== original.gold ||
        currentItem.diamond !== original.diamond ||
        currentItem.itemType !== original.itemType ||
        currentItem.equipped !== original.equipped ||
        currentItem.sectID !== original.sectID ||
        currentItem.categoryID !== original.categoryID ||
        (currentItem.image && currentItem.image !== original.image)
      ) {
        formData.append('itemName', currentItem.itemName);
        formData.append('itemDescription', currentItem.itemDescription);
        formData.append('gold', currentItem.gold);
        formData.append('diamond', currentItem.diamond);
        formData.append('itemType', currentItem.itemType);
        formData.append('equipped', currentItem.equipped);
        formData.append('sectID', currentItem.sectID);
        formData.append('categoryID', currentItem.categoryID);
        formData.append('image', currentItem.image);
      } else {
        setMessage('Nothing to update');
        return;
      }
    } else {
      if (currentItem.itemName !== originalItem.itemName) {
        formData.append('itemName', currentItem.itemName);
      }
      if (currentItem.itemDescription !== originalItem.itemDescription) {
        formData.append('itemDescription', currentItem.itemDescription);
      }
      if (currentItem.gold !== originalItem.gold) {
        formData.append('gold', currentItem.gold);
      }
      if (currentItem.diamond !== originalItem.diamond) {
        formData.append('diamond', currentItem.diamond);
      }
      if (currentItem.itemType !== originalItem.itemType) {
        formData.append('itemType', currentItem.itemType);
      }
      if (currentItem.equipped !== originalItem.equipped) {
        formData.append('equipped', currentItem.equipped);
      }
      if (currentItem.sectID !== originalItem.sectID) {
        formData.append('sectID', currentItem.sectID);
      }
      if (currentItem.categoryID !== originalItem.categoryID) {
        formData.append('categoryID', currentItem.categoryID);
      }
      if (currentItem.image && currentItem.image !== originalItem.image) {
        formData.append('image', currentItem.image);
      }
    }  

    const url =
      dialogMode === 'create'
        ? 'https://localhost:7052/api/mf/items'
        : `https://localhost:7052/api/mf/items/${currentItem.itemID}`;

    try {
      let response;
      if (dialogMode === 'create') {
        response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage('Item created successfully');
      } else if (dialogMode === 'update') {
        response = await axios.put(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage('Item updated successfully');
      }

      if (response.status === 200 || response.status === 202) {
        setDialogVisible(false);
        loadItem();
      } else {
        setMessage('Failed to save the item');
      }
    } catch (error) {
      console.error(error);
      setMessage('Failed to save the item');
    }
  };

  const removeItem = async () => {
    if (itemRemoved) {
      try {
        await axios.delete(
          `https://localhost:7052/api/mf/items/${itemRemoved.itemID}`
        );
        setMessage('Item deleted successfully');
        loadItem();
        if (currentItemPage.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error(error);
        setMessage('Failed to delete the item');
      }
      closeDeleteDialog();
    }
  };

  const handleDialogOpen = (mode, item) => {
    if (mode === 'view') {
      setCurrentItem(item);
      setViewDialogVisible(true);
    } else if (mode === 'create') {
      if (sects.length === 0 || categories.length === 0) {
        setDialogMessage(true);
        if (sects.length === 0) {
          setNullMode('sect');
        } else if (categories.length === 0) {
          setNullMode('categories');
        }
      } else {
        setDialogMode(mode);
        setCurrentItem({
          ...item,
          image: null,
          equipped: false,
          sectID: defaultSect,
          categoryID: defaultCategory,
        });
        setDialogVisible(true);
      }
    } else {
      setDialogMode(mode);
      setCurrentItem({
        ...currentItem,
        ...item,
      });
      setDialogVisible(true);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setCurrentItem({});
  };

  const closeViewDialog = () => {
    setViewDialogVisible(false);
  };

  const handleClose = (mode) => {
    setDialogMessage(false);
    if (mode === 'sect') {
      localStorage.setItem('activeItem', 'Sects');
      history('/admin-sects');
    } else if (mode === 'categories') {
      localStorage.setItem('activeItem', 'Categories');
      history('/admin-categories');
    }
  };

  const handleSearchChange = (e) => { 
    setSearchTerm(e.target.value)
    setCurrentPage(1);
    setSortType('all');
  };

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setMessageSearch('Please enter a valid data for search');
      setItems(originalItem);
      return;
    }
    setMessageSearch('');
    const filteredItem = originalItem.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setItems(filteredItem);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReload = () => {
    setSearchTerm('');
    setMessageSearch('');
    setSortType('all');
    setCurrentPage(1);
    loadItem();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    sortCharacter(e.target.value);
    setSearchTerm('');
    setMessageSearch('');
    setCurrentPage(1);
  };

  const sortCharacter = (sortType) => {
    console.log('sortType:', sortType, typeof sortType);
    if (sortType === 'all') {
      loadItem();
    } else {
      const sortedItem = originalItem.filter((item) => {
        return item.categoryID === parseInt(sortType, 10);
      });
      setItems(sortedItem);
    }
  };

  const renderPage = () => {
    if (filteredItem.length <= ITEM_PER_PAGE) {
      return null;
    }

    return (
      <div className='pagination-buttons'>
        {filteredItem.length === 0 ? (
          <div></div>
        ) : (
          <div className='pagination'>
            <div className='footer-page'>
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              >
                <FaAngleDoubleLeft />
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaAngleLeft />
              </button>
              <div className='page-number'>Page {currentPage}</div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredItem.length / ITEM_PER_PAGE)
                }
              >
                <FaAngleRight />
              </button>
              <button
                onClick={() =>
                  handlePageChange(
                    Math.ceil(filteredItem.length / ITEM_PER_PAGE)
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredItem.length / ITEM_PER_PAGE)
                }
              >
                <FaAngleDoubleRight />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='admin-item-container'>
      <h1>Managing Item</h1>
      {originalItem.length === 0 ? (
        <div className='admin-item-nodata'>
          <p className='admin-item-empty'>The item list is empty</p>
          <div className='admin-add-item-empty'>
            <button onClick={() => handleDialogOpen('create')}>
              <FaPlus />
            </button>
          </div>
          {dialogMessage && (
            <div className='dialog-no-action-container'>
              <div className='dialog-no-action-content'>
                <h2>
                  No {nullMode === 'sect' ? 'Sect' : 'Category'} Available
                </h2>
                <p>
                  There are no {nullMode === 'sect' ? 'sects' : 'categories'}{' '}
                  available. Please add a{' '}
                  {nullMode === 'sect' ? 'sect' : 'category'} first.
                </p>
                <div className='dialog-no-action-group'>
                  <button
                    onClick={() =>
                      handleClose(nullMode === 'sect' ? 'sect' : 'categories')
                    }
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
          {dialogVisible && (
            <div className='dialog-empt-action-container'>
              <div className='dialog-empt-action-content'>
                <h2>{dialogMode === 'create' ? 'Create' : 'Update'} Item</h2>
                <div className='dialog-empt-action-main'>
                  <div className='dialog-empt-action-image-main'>
                    <label className='dialog-empt-action-image-group'>
                      <input
                        type='file'
                        id='images'
                        accept='image/*'
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            image: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentItem.itemID}
                      />
                      {currentItem.image ? (
                        <img
                          src={
                            currentItem.image instanceof File
                              ? window.URL.createObjectURL(currentItem.image)
                              : `https://localhost:7052/${currentItem.image}`
                          }
                          alt='item-img'
                        />
                      ) : (
                        <img src='/assets/images/map.png' alt='item-img' />
                      )}
                    </label>
                  </div>
                  <div className='dialog-empt-action-content-main'>
                    <div className='main-input'>
                      <div className='left-side'>
                        <div className='dialog-empt-action-group'>
                          <label htmlFor='itemName'>Item Name:</label>
                          <input
                            className='item_name'
                            type='text'
                            id='itemName'
                            value={currentItem.itemName || ''}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                itemName: e.target.value,
                              })
                            }
                            placeholder='Please enter item name'
                          />
                        </div>
                        <div className='dialog-empt-action-group'>
                          <label htmlFor='itemDescription'>Description:</label>
                          <textarea
                            id='itemDescription'
                            value={currentItem.itemDescription || ''}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                itemDescription: e.target.value,
                              })
                            }
                            placeholder='Please enter the item description'
                          />
                        </div>
                        <div className='dialog-empt-action-group'>
                          <label htmlFor='equipped'>Equipped:</label>
                          <input
                            type='checkbox'
                            id='equipped'
                            checked={currentItem.equipped}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                equipped: e.target.checked,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className='right-side'>
                        <div className='dialog-empt-action-group'>
                          <label htmlFor='gold'>Gold:</label>
                          <input
                            type='number'
                            id='gold'
                            value={currentItem.gold || ''}
                            min={1}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                gold: e.target.value,
                              })
                            }
                            placeholder='Please enter number value'
                          />
                        </div>
                        <div className='dialog-empt-action-group'>
                          <label htmlFor='diamond'>Diamond:</label>
                          <input
                            type='number'
                            id='diamond'
                            value={currentItem.diamond || ''}
                            min={1}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                diamond: e.target.value,
                              })
                            }
                            placeholder='Please enter number value'
                          />
                        </div>
                        <div className='dialog-empt-action-group'>
                          <label htmlFor='itemType'>Item Type:</label>
                          <input
                            type='number'
                            id='itemType'
                            min={1}
                            value={currentItem.itemType || ''}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                itemType: e.target.value,
                              })
                            }
                            placeholder='Please enter item type (level 1, level 2, etc)'
                          />
                        </div>

                        <div className='dialog-empt-action-group'>
                          <label htmlFor='sectID'>Sect:</label>
                          <select
                            className='sectID'
                            id='sectID'
                            value={currentItem.sectID || ''}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                sectID: parseInt(e.target.value, 10),
                              })
                            }
                          >
                            {sects.map((sect) => (
                              <option key={sect.sectID} value={sect.sectID}>
                                {sect.sectName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className='dialog-empt-action-group'>
                          <label htmlFor='categoryID'>Category:</label>
                          <select
                            className='categoryID'
                            id='categoryID'
                            value={currentItem.categoryID || ''}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                categoryID: parseInt(e.target.value, 10),
                              })
                            }
                          >
                            {categories.map((category) => (
                              <option
                                key={category.categoryID}
                                value={category.categoryID}
                              >
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='dialog-empt-action-handle'>
                      <button onClick={actionItem} id='actions-empt'>
                        {dialogMode === 'create' ? 'Create' : 'Update'}
                      </button>
                      <button
                        onClick={handleDialogClose}
                        id='cancel-empt-actions'
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {message && (
            <div className='dialog-message-container'>
              <div className='dialog-message-content'>
                <p>{message}</p>
                <button onClick={() => setMessage('')}>OK</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className='admin-items-top'>
            <div className='admin-search-bar'>
              <input
                type='text'
                placeholder='Search by name...'
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKey}
              />
              <button className='admin-search-icons' onClick={handleSearch}>
                <FaSearch />
              </button>
              <button className='admin-search-reload' onClick={handleReload}>
                <FaSyncAlt />
              </button>
            </div>
            <div className='admin-items-filter'>
              <select value={sortType} onChange={handleSortChange}>
                <option value='all'>All</option>
                {categories.map((category) => (
                  <option key={category.categoryID} value={category.categoryID}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            <div className='admin-add-items'>
              <button onClick={() => handleDialogOpen('create')}>
                Create&nbsp;
                <FaPlus />
              </button>
            </div>
          </div>
          {messageSearch ? (
            <div className='error-message'>{messageSearch}</div>
          ) : (
            <>
              {currentItemPage.length === 0 ? (
                <div className='error-message'>No data was found</div>
              ) : (
                <div
                  className='none-display'
                  id={currentItemPage.length === 0 ? 'none' : ''}
                >
                  {items.length} {items.length === 1 ? 'item' : 'items'} found
                </div>
              )}
            </>
          )}
          {currentItemPage.length === 0 ? (
            <div className='table-nodata-display'></div>
          ) : (
            <div className='admin-items-table'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Gold</th>
                    <th>Diamond</th>
                    <th>Sect</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItemPage.map((item) => (
                    <tr key={item.itemID}>
                      <td className='admin-items-images'>
                        <div className='image-container'>
                          {item.image && (
                            <img
                              src={`https://localhost:7052/${item.image}`}
                              alt='item-img'
                            />
                          )}
                        </div>
                      </td>
                      <td className='admin-item-name'>
                        <span>{item.itemName}</span>
                      </td>
                      <td className='admin-item-gold'>
                        <span>{item.gold}</span>
                      </td>
                      <td className='admin-item-diamond'>
                        <span>{item.diamond}</span>
                      </td>
                      <td className='admin-item-sect'>
                        {item.sectID && (
                          <span>
                            {sects.find((sect) => sect.sectID === item.sectID)
                              ?.sectName || ''}
                          </span>
                        )}
                      </td>
                      <td className='admin-item-category'>
                        {item.categoryID && (
                          <span>
                            {categories.find(
                              (category) =>
                                category.categoryID === item.categoryID
                            )?.categoryName || ''}
                          </span>
                        )}
                      </td>
                      <td className='admin-items-actions'>
                        <button onClick={() => handleDialogOpen('view', item)}>
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDialogOpen('update', item)}
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => showDeleteDialog(item)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {deleteDialogVisible && (
            <div className='dialog-remove-container'>
              <div className='dialog-remove-content'>
                <h3>Remove Message Confirm</h3>
                <p>Are you sure you want to delete this item?</p>
                <div className='dialog-remove-buttons'>
                  <button onClick={removeItem} id='removed'>
                    <FaCheck />
                  </button>
                  <button onClick={closeDeleteDialog} id='cancel-removed'>
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          )}
          {dialogVisible && (
            <div className='dialog-action-container'>
              <div className='dialog-action-content'>
                <h2>{dialogMode === 'create' ? 'Create' : 'Update'} Item</h2>
                <div className='dialog-action-main'>
                  <div className='dialog-action-image-main'>
                    <label className='dialog-action-image-group'>
                      <input
                        type='file'
                        id='images'
                        accept='image/*'
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            image: e.target.files[0],
                          })
                        }
                        hidden
                        required={!currentItem.itemID}
                      />
                      {currentItem.image ? (
                        <img
                          src={
                            currentItem.image instanceof File
                              ? window.URL.createObjectURL(currentItem.image)
                              : `https://localhost:7052/${currentItem.image}`
                          }
                          alt='item-img'
                        />
                      ) : (
                        <img src='/assets/images/map.png' alt='item-img' />
                      )}
                    </label>
                  </div>
                  <div className='dialog-action-content-main'>
                    <div className='main-input'>
                      <div className='left-side'>
                        <div className='dialog-action-group'>
                          <label htmlFor='itemName'>Item Name:</label>
                          <input
                            className='item_name'
                            type='text'
                            id='itemName'
                            value={currentItem.itemName || ''}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                itemName: e.target.value,
                              })
                            }
                            placeholder='Please enter item name'
                          />
                        </div>
                        <div className='dialog-action-group'>
                          <label htmlFor='itemDescription'>Description:</label>
                          <textarea
                            id='itemDescription'
                            value={currentItem.itemDescription || ''}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                itemDescription: e.target.value,
                              })
                            }
                            placeholder='Please enter the item description'
                          />
                        </div>
                        <div className='dialog-action-group'>
                          <label htmlFor='equipped'>Equipped:</label>
                          <input
                            type='checkbox'
                            id='equipped'
                            checked={currentItem.equipped}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                equipped: e.target.checked,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className='right-side'>
                        <div className='dialog-action-group'>
                          <label htmlFor='gold'>Gold:</label>
                          <input
                            type='number'
                            id='gold'
                            value={currentItem.gold || ''}
                            min={1}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                gold: e.target.value,
                              })
                            }
                            placeholder='Please enter number value'
                          />
                        </div>
                        <div className='dialog-action-group'>
                          <label htmlFor='diamond'>Diamond:</label>
                          <input
                            type='number'
                            id='diamond'
                            value={currentItem.diamond || ''}
                            min={1}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                diamond: e.target.value,
                              })
                            }
                            placeholder='Please enter number value'
                          />
                        </div>
                        <div className='dialog-action-group'>
                          <label htmlFor='itemType'>Item Type:</label>
                          <input
                            type='number'
                            id='itemType'
                            min={1}
                            value={currentItem.itemType || ''}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                itemType: e.target.value,
                              })
                            }
                            placeholder='Please enter item type (level 1, level 2, etc)'
                          />
                        </div>

                        <div className='dialog-action-group'>
                          <label htmlFor='sectID'>Sect:</label>
                          <select
                            className='sectID'
                            id='sectID'
                            value={currentItem.sectID || ''}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                sectID: parseInt(e.target.value, 10),
                              })
                            }
                          >
                            {sects.map((sect) => (
                              <option key={sect.sectID} value={sect.sectID}>
                                {sect.sectName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className='dialog-action-group'>
                          <label htmlFor='categoryID'>Category:</label>
                          <select
                            className='categoryID'
                            id='categoryID'
                            value={currentItem.categoryID || ''}
                            onChange={(e) =>
                              setCurrentItem({
                                ...currentItem,
                                categoryID: parseInt(e.target.value, 10),
                              })
                            }
                          >
                            {categories.map((category) => (
                              <option
                                key={category.categoryID}
                                value={category.categoryID}
                              >
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='dialog-action-handle'>
                      <button onClick={actionItem} id='actions'>
                        {dialogMode === 'create' ? 'Create' : 'Update'}
                      </button>
                      <button onClick={handleDialogClose} id='cancel-actions'>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {viewDialogVisible && (
            <div className='dialog-view-container'>
              <div className='dialog-view-main-content'>
                <div className='dialog-view-content'>
                  <h3>View {currentItem.itemName}</h3>
                  <div className='dialog-view-images'>
                    {currentItem.image && (
                      <img
                        src={`https://localhost:7052/${currentItem.image}`}
                        alt='item-img'
                        className='image-view-dialog'
                      />
                    )}
                  </div>
                  <div className='dialog-view-main'>
                    <div className='left-side-dialog'>
                      <label>
                        <p>Item Name:</p> <span>{currentItem.itemName}</span>
                      </label>
                      <label>
                        <p>Description:</p>
                        <span> {currentItem.itemDescription}</span>
                      </label>
                      <label>
                        <p>Gold:</p>
                        <span> {currentItem.gold}</span>
                      </label>
                      <label>
                        <p>Diamond:</p>
                        <span> {currentItem.diamond}</span>
                      </label>
                    </div>
                    <div className='right-side-dialog'>
                      <label>
                        <p>Item Type:</p>
                        <span> {currentItem.itemType}</span>
                      </label>
                      <label>
                        <p>isEquipped:</p>
                        <span>
                          {' '}
                          {currentItem.equipped ? 'Equipped' : 'None'}
                        </span>
                      </label>
                      <label>
                        <p>Sect:</p>
                        {currentItem.sectID && (
                          <span>
                            {sects.find(
                              (sect) => sect.sectID === currentItem.sectID
                            )?.sectName || ''}
                          </span>
                        )}
                      </label>
                      <label>
                        <p>Category:</p>
                        {currentItem.categoryID && (
                          <span>
                            {categories.find(
                              (category) =>
                                category.categoryID === currentItem.categoryID
                            )?.categoryName || ''}
                          </span>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className='dialog-view-button'>
                    <button onClick={closeViewDialog}>OK</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {renderPage()}
          {message && (
            <div className='dialog-message-container'>
              <div className='dialog-message-content'>
                <p>{message}</p>
                <button onClick={() => setMessage('')}>OK</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminItem;
