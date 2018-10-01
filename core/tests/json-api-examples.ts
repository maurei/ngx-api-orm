import { JsonApiResponse } from '../src/resource/request-handlers/jsonapidotorg/declarations';

export const dummyModels = {
	meta: {
		page: 1,
		resources_per_page: 5,
		total_resources: 6
	},
	data: [
		{
			type: 'dummyModels',
			id: '1',
			attributes: {
				a: 'a field',
				b: 'b field'
			}
		},
		{
			type: 'dummyModels',
			id: '2',
			attributes: {
				a: 'a field',
				b: 'b field'
			}
		}
	]
};

export const nestedModels = {
	meta: {
		page: 1,
		resources_per_page: 5,
		total_resources: 6
	},
	data: [
		{
			type: 'dummyModels',
			id: '1',
			attributes: {
				a: 'a field',
				b: 'b field'
			},
			relationships: {
				author: {
					links: {
						self: '/dummyModels/1/relatedModels/author',
						related: '/articles/1/author'
					},
					data: {
						type: 'people',
						id: '9'
					}
				}
			}
		},
		{
			type: 'dummyModels',
			id: '2',
			attributes: {
				a: 'a field',
				b: 'b field'
			},
			relationships: {
				author: {
					links: {
						self: '/articles/2/relationships/author',
						related: '/articles/2/author'
					},
					data: null
				}
			}
		}
	]
};

export const flatSingle: JsonApiResponse = {
	links: {
		self: 'http://example.com/articles',
		next: 'http://example.com/articles?page[offset]=2',
		last: 'http://example.com/articles?page[offset]=10'
	},
	data: {
		type: 'articles',
		id: '1',
		attributes: {
			title: 'JSON API paints my bikeshed!'
		},
		relationships: {
			author: {
				links: {
					self: 'http://example.com/articles/1/relationships/author',
					related: 'http://example.com/articles/1/author'
				},
				data: { type: 'people', id: '9' }
			},
			comments: {
				links: {
					self: 'http://example.com/articles/1/relationships/comments',
					related: 'http://example.com/articles/1/comments'
				},
				data: [{ type: 'comments', id: '5' }, { type: 'comments', id: '12' }]
			}
		},
		links: {
			self: 'http://example.com/articles/1'
		}
	}
};
export const flatCollection: JsonApiResponse = {
	links: {
		self: 'http://example.com/articles',
		next: 'http://example.com/articles?page[offset]=2',
		last: 'http://example.com/articles?page[offset]=10'
	},
	data: [
		{
			type: 'articles',
			id: '1',
			attributes: {
				title: 'JSON API paints my bikeshed!'
			},
			relationships: {
				author: {
					links: {
						self: 'http://example.com/articles/1/relationships/author',
						related: 'http://example.com/articles/1/author'
					},
					data: { type: 'people', id: '9' }
				},
				comments: {
					links: {
						self: 'http://example.com/articles/1/relationships/comments',
						related: 'http://example.com/articles/1/comments'
					},
					data: [{ type: 'comments', id: '5' }, { type: 'comments', id: '12' }]
				}
			},
			links: {
				self: 'http://example.com/articles/1'
			}
		},
		{
			type: 'articles',
			id: '2',
			attributes: {
				title: 'JSON API paints my bikeshed: episode 2!'
			},
			relationships: {
				author: {
					links: {
						self: 'http://example.com/articles/2/relationships/author',
						related: 'http://example.com/articles/2/author'
					},
					data: { type: 'people', id: '9' }
				},
				comments: {
					links: {
						self: 'http://example.com/articles/2/relationships/comments',
						related: 'http://example.com/articles/2/comments'
					},
					data: [{ type: 'comments', id: '20' }, { type: 'comments', id: '22' }]
				}
			},
			links: {
				self: 'http://example.com/articles/2'
			}
		}
	]
};

export const nestedSingle: JsonApiResponse = {
	links: {
		self: 'http://example.com/articles',
		next: 'http://example.com/articles?page[offset]=2',
		last: 'http://example.com/articles?page[offset]=10'
	},
	data: {
		type: 'articles',
		id: '1',
		attributes: {
			title: 'JSON API paints my bikeshed!'
		},
		relationships: {
			author: {
				links: {
					self: 'http://example.com/articles/1/relationships/author',
					related: 'http://example.com/articles/1/author'
				},
				data: { type: 'people', id: '9' }
			},
			comments: {
				links: {
					self: 'http://example.com/articles/1/relationships/comments',
					related: 'http://example.com/articles/1/comments'
				},
				data: [{ type: 'comments', id: '5' }, { type: 'comments', id: '12' }]
			}
		},
		links: {
			self: 'http://example.com/articles/1'
		}
	},
	included: [
		{
			type: 'people',
			id: '9',
			attributes: {
				firstName: 'Dan',
				lastName: 'Gebhardt',
				twitter: 'dgeb'
			},
			links: {
				self: 'http://example.com/people/9'
			}
		},
		{
			type: 'comments',
			id: '5',
			attributes: {
				body: 'First!'
			},
			relationships: {
				author: {
					data: { type: 'people', id: '2' }
				}
			},
			links: {
				self: 'http://example.com/comments/5'
			}
		},
		{
			type: 'comments',
			id: '12',
			attributes: {
				body: 'I like XML better'
			},
			relationships: {
				author: {
					data: { type: 'people', id: '9' }
				}
			},
			links: {
				self: 'http://example.com/comments/12'
			}
		}
	]
};

export const nestedCollection: JsonApiResponse = {
	links: {
		self: 'http://example.com/articles',
		next: 'http://example.com/articles?page[offset]=2',
		last: 'http://example.com/articles?page[offset]=10'
	},
	data: [
		{
			type: 'articles',
			id: '1',
			attributes: {
				title: 'JSON API paints my bikeshed!'
			},
			relationships: {
				author: {
					links: {
						self: 'http://example.com/articles/1/relationships/author',
						related: 'http://example.com/articles/1/author'
					},
					data: { type: 'people', id: '9' }
				},
				comments: {
					links: {
						self: 'http://example.com/articles/1/relationships/comments',
						related: 'http://example.com/articles/1/comments'
					},
					data: [{ type: 'comments', id: '5' }, { type: 'comments', id: '12' }]
				}
			},
			links: {
				self: 'http://example.com/articles/1'
			}
		},
		{
			type: 'articles',
			id: '2',
			attributes: {
				title: 'JSON API paints my bikeshed: episode 2!'
			},
			relationships: {
				author: {
					links: {
						self: 'http://example.com/articles/2/relationships/author',
						related: 'http://example.com/articles/2/author'
					},
					data: { type: 'people', id: '40' }
				},
				comments: {
					links: {
						self: 'http://example.com/articles/2/relationships/comments',
						related: 'http://example.com/articles/2/comments'
					},
					data: [{ type: 'comments', id: '20' }, { type: 'comments', id: '22' }]
				}
			},
			links: {
				self: 'http://example.com/articles/2'
			}
		}
	],
	included: [
		{
			type: 'people',
			id: '9',
			attributes: {
				firstName: 'Dan',
				lastName: 'Gebhardt',
				twitter: 'dgeb'
			},
			links: {
				self: 'http://example.com/people/9'
			}
		},
		{
			type: 'comments',
			id: '5',
			attributes: {
				body: 'First!'
			},
			relationships: {
				author: {
					data: { type: 'people', id: '2' }
				}
			},
			links: {
				self: 'http://example.com/comments/5'
			}
		},
		{
			type: 'comments',
			id: '12',
			attributes: {
				body: 'I like XML better'
			},
			relationships: {
				author: {
					data: { type: 'people', id: '9' }
				}
			},
			links: {
				self: 'http://example.com/comments/12'
			}
		}
	]
};
