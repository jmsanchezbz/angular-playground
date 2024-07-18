import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { CategoryDTO } from "../Models/category.dto";
import { PostService } from "./post.service";
import { PostDTO } from "../Models/post.dto";

export interface updateResponse {
  affected: number;
}

export interface deleteResponse {
  affected: number;
}

const categoriesList: CategoryDTO[] = [
  {
    userId: "",
    categoryId: "1",
    css_color: "",
    description: "",
    title: "",
  },
  {
    userId: "",
    categoryId: "2",
    css_color: "",
    description: "",
    title: "",
  },
  {
    userId: "",
    categoryId: "3",
    css_color: "",
    description: "",
    title: "",
  },
];

const postAdd: PostDTO = {
  postId: "",
  title: "",
  description: "",
  num_likes: 0,
  num_dislikes: 0,
  publication_date: new Date(2024, 0, 1, 10, 10, 0),
  categories: [categoriesList[0]],
  userId: "",
  userAlias: "",
};

const postList: PostDTO[] = [
  {
    postId: "1",
    title: "",
    description: "",
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(2024, 0, 1, 10, 10, 0),
    categories: [categoriesList[0]],
    userId: "",
    userAlias: "",
  },
  {
    postId: "2",
    title: "",
    description: "",
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(2024, 1, 1, 10, 10, 0),
    categories: [categoriesList[1]],
    userId: "",
    userAlias: "",
  },
  {
    postId: "3",
    title: "",
    description: "",
    num_likes: 0,
    num_dislikes: 0,
    publication_date: new Date(2024, 2, 1, 10, 10, 0),
    categories: [categoriesList[2]],
    userId: "",
    userAlias: "",
  },
];

describe("PostService", () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should be creared", () => {
    expect(service).toBeTruthy();
  });

  it("GET method and getPosts return a list of posts", () => {
    service.getPosts().subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(postList);
    });

    const req = httpMock.expectOne(`http://localhost:3000/posts`);

    expect(req.request.method).toBe("GET");

    req.flush(postList);
  });

  it("GET method and getPostsByUserId return a list of posts", () => {
    service.getPostsByUserId("1").subscribe((resp: PostDTO[]) => {
      expect(resp).toEqual(postList);
    });

    const req = httpMock.expectOne(`http://localhost:3000/users/posts/1`);

    expect(req.request.method).toBe("GET");

    req.flush(postList);
  });

  it("POST method and createPost return a post", () => {
    const { postId, ...expPartial } = postAdd;
    service.createPost(postAdd).subscribe((resp: PostDTO) => {
      const { postId, ...partial } = resp;

      expect(postId).toBeTruthy();
      expect(partial).toEqual(expPartial);
    });

    const req = httpMock.expectOne("http://localhost:3000/posts");

    expect(req.request.method).toBe("POST");

    req.flush({ ...postAdd, postId: "newId" });
  });

  it("GET method and getPostById return a post", () => {
    service.getPostById("1").subscribe((resp: PostDTO) => {
      expect(resp).toEqual(postList[0]);
    });

    const req = httpMock.expectOne("http://localhost:3000/posts/1");

    expect(req.request.method).toBe("GET");

    req.flush(postList[0]);
  });

  it("PUT method and updatePost return a post", () => {
    let post = {
      ...postList[0],
      title: "title updated",
      desciption: "desc updated",
      num_likes: 1,
      num_dislikes: 0,
      publication_date: new Date(2024, 11, 31, 10, 10, 0),
      categories: [categoriesList[2]],
      userId: "1",
      userAlias: "updater",
    };

    service.updatePost(post.postId, post).subscribe((resp: PostDTO) => {
      expect(resp).toEqual(post);
    });

    const req = httpMock.expectOne("http://localhost:3000/posts/1");

    expect(req.request.method).toBe("PUT");

    req.flush(post);
  });

  it("DELETE method and deletePost return delete response", () => {
    let post = {
      ...postList[0],
    };

    const delResponse: deleteResponse = {
      affected: 1,
    };

    service.deletePost(post.postId).subscribe((resp: deleteResponse) => {
      expect(resp).toEqual(delResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:3000/posts/${post.postId}`
    );

    expect(req.request.method).toBe("DELETE");

    req.flush(delResponse);
  });

  it("PUT method and likePost return a update response", () => {
    let post = {
      ...postList[0],
    };

    const updResponse: updateResponse = {
      affected: 1,
    };

    service.likePost(post.postId).subscribe((resp: updateResponse) => {
      expect(resp).toEqual(updResponse);
    });

    const req = httpMock.expectOne("http://localhost:3000/posts/like/1");

    expect(req.request.method).toBe("PUT");

    req.flush(updResponse);
  });

  it("PUT method and dislikePost return a update response", () => {
    let post = {
      ...postList[0],
    };

    const updResponse: updateResponse = {
      affected: 1,
    };

    service.dislikePost(post.postId).subscribe((resp: updateResponse) => {
      expect(resp).toEqual(updResponse);
    });

    const req = httpMock.expectOne("http://localhost:3000/posts/dislike/1");

    expect(req.request.method).toBe("PUT");

    req.flush(updResponse);
  });
});
